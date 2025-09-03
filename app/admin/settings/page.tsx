"use client"

import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="lg:ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure platform settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="ExamPrep+" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" defaultValue="support@examprep.com" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <Switch id="maintenance-mode" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coin Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-coins">Coins per Quiz</Label>
                <Input id="quiz-coins" type="number" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="streak-bonus">Daily Streak Bonus</Label>
                <Input id="streak-bonus" type="number" defaultValue="5" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="coin-rewards">Enable Coin Rewards</Label>
                <Switch id="coin-rewards" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
