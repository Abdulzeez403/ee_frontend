"use client";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useToast } from "@/hooks/use-toast";
import { purchaseData } from "@/redux/features/reward";
import { NetworkProviders } from "@/app/constact/networProvider";
import { Input } from "@/components/ui/input";

const DataFormSchema = Yup.object().shape({
  phone: Yup.string().required("Phone number is Required"),
  dataPlan: Yup.string().required("Data plan is required"),
});

const DataPlans = ["500MB", "1GB", "2GB", "3GB"];

export const DataBundleForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.coins);

  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [selectedDataPlan, setSelectedDataPlan] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async (values: any) => {
    const userPoints = user?.coins ?? 0;
    const dataPlanAmount =
      Number(selectedDataPlan.replace("MB", "").replace("GB", "")) *
      (selectedDataPlan.includes("GB") ? 1000 : 1); // Convert to MB cost

    if (userPoints < dataPlanAmount) {
      toast({
        title:
          "Oooop!! You don't have sufficient Coin to perform this transaction",
      });
    } else {
      try {
        const payload = {
          phone: values.phone,
          network: selectedNetwork.toUpperCase(),
          dataPlan: selectedDataPlan,
        };

        await dispatch(purchaseData(payload as any));
        toast({ title: "Data bundle purchased successfully!" });
      } catch (error) {
        console.error("Error buying data:", error);
        toast({ title: "An error occurred while buying data." });
      }
    }
  };

  const initialValues = { phone: "", dataPlan: "" };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Buy Data Bundle
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={DataFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form className="space-y-6">
            {/* Network selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Select Network
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {NetworkProviders.map((provider, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedNetwork(provider.value)}
                    className={`relative border rounded-xl p-2 cursor-pointer transition-all ${
                      selectedNetwork === provider.value
                        ? "border-blue-500 ring-2 ring-blue-300"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={provider.img}
                      alt={provider.value}
                      className="w-16 h-16 mx-auto rounded-lg object-contain"
                    />
                    <p className="text-center mt-2 text-sm font-medium text-gray-700">
                      {provider.value.toUpperCase()}
                    </p>
                    {selectedNetwork === provider.value && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Data plan selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Choose Data Plan
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {DataPlans.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedDataPlan(data);
                      setFieldValue("dataPlan", data);
                    }}
                    className={`relative rounded-xl border px-4 py-3 text-center cursor-pointer font-medium transition-all ${
                      selectedDataPlan === data
                        ? "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-200"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    {data}
                    {selectedDataPlan === data && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {errors.dataPlan && touched.dataPlan && (
                <p className="text-sm text-red-500 mt-1">{errors.dataPlan}</p>
              )}
            </div>

            {/* Phone number input */}
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="e.g. 08012345678"
                className={`w-full ${
                  errors.phone && touched.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && touched.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Submit button */}
            <div className="text-center">
              <Button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                disabled={isSubmitting || loading}
              >
                {loading ? "Processing..." : "Purchase Data"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DataBundleForm;
