"use client";
import { Button } from "@/components/ui/button";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { purchaseAirtime } from "@/redux/features/reward";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { NetworkProviders } from "@/app/constact/networProvider";
import { CheckCircle } from "lucide-react";

const predefinedAmounts = ["100", "200", "500", "1000"];

const AirtimeFormSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^0[789]\d{9}$/, "Enter a valid Nigerian phone number")
    .required("Phone number is required"),
  amount: Yup.number().required("Amount is required"),
  network: Yup.string().required("Please select a network"),
});

export const AirtimeForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.reward);
  const { toast } = useToast();

  const handleSubmit = async (values: any) => {
    const userCoins = user?.coins ?? 0;
    if (userCoins < values.amount) {
      return toast({
        title: "Error",
        description: "❌ You don’t have enough coins for this transaction.",
      });
    }

    try {
      const resultAction = await dispatch(purchaseAirtime(values));

      if (purchaseAirtime.fulfilled.match(resultAction)) {
        toast({ title: "✅ Airtime purchase successful!" });
      } else {
        toast({
          title:
            (resultAction.payload as string) ||
            "❌ An error occurred while buying airtime.",
        });
      }
    } catch (err) {
      console.error("Error buying airtime:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <Formik
        initialValues={{ phone: "", amount: 0, network: "" }}
        validationSchema={AirtimeFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {/* Network Selection */}
            <h3 className="mb-2 font-medium">Select Network</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
              {NetworkProviders.map((provider) => (
                <div
                  key={provider.value}
                  onClick={() => setFieldValue("network", provider.value)}
                  className={`relative border rounded-lg cursor-pointer p-2 flex justify-center items-center transition
                    ${
                      values.network === provider.value
                        ? "ring-2 ring-blue-500"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <img
                    src={provider.img}
                    alt={provider.value}
                    className="w-16 h-16 object-contain"
                  />
                  {values.network === provider.value && (
                    <CheckCircle className="absolute top-2 right-2 text-blue-500 w-5 h-5" />
                  )}
                </div>
              ))}
            </div>
            <ErrorMessage
              name="network"
              component="p"
              className="text-red-500 text-sm mb-4"
            />

            {/* Amount Selection */}
            <h3 className="mb-2 font-medium">Select Amount</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
              {predefinedAmounts.map((amount) => (
                <div
                  key={amount}
                  onClick={() => setFieldValue("amount", Number(amount))}
                  className={`relative border rounded-lg py-4 text-center cursor-pointer transition
                    ${
                      values.amount === Number(amount)
                        ? "ring-2 ring-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  ₦{amount}
                  {values.amount === Number(amount) && (
                    <CheckCircle className="absolute top-2 right-2 text-green-500 w-5 h-5" />
                  )}
                </div>
              ))}
            </div>
            <ErrorMessage
              name="amount"
              component="p"
              className="text-red-500 text-sm mb-4"
            />

            {/* Phone Number */}
            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone Number
            </label>
            <Field as={Input} id="phone" name="phone" type="text" />
            <ErrorMessage
              name="phone"
              component="p"
              className="text-red-500 text-sm mb-4"
            />

            {/* Submit */}
            <Button
              type="submit"
              className="mt-4 w-full sm:w-auto bg-black hover:bg-gray-800 text-white"
              disabled={isSubmitting || loading}
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AirtimeForm;
