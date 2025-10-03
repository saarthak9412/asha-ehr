"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePatients, useReminders } from "@/lib/data";
import { useTranslatedData } from "@/lib/dataHelpers";
import { useTranslation, supportedLanguages } from "@/lib/i18n";

export default function TranslationDemo() {
  const { t, setLanguage, currentLanguage } = useTranslation();
  const { patients } = usePatients();
  const { reminders } = useReminders();
  const { translatePatient, translateReminder } = useTranslatedData();

  // Get first patient and reminder for demo
  const samplePatient = patients[0];
  const sampleReminder = reminders[0];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Language Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Language Selector - {t("language")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {supportedLanguages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={
                    currentLanguage === lang.code ? "default" : "outline"
                  }
                  onClick={() => setLanguage(lang.code)}
                  className="text-sm"
                >
                  {lang.flag} {lang.nativeName}
                </Button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Current Language: <strong>{currentLanguage}</strong>
            </p>
          </CardContent>
        </Card>

        {/* Sample Patient Data */}
        {samplePatient && (
          <Card>
            <CardHeader>
              <CardTitle>{t("patientDetails")} - Dynamic Translation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Original Data (Keys):</h4>
                  <div className="space-y-2 text-sm font-mono bg-gray-100 p-3 rounded">
                    <p>
                      <strong>Name:</strong> {samplePatient.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {samplePatient.address}
                    </p>
                    <p>
                      <strong>Conditions:</strong>{" "}
                      {samplePatient.conditions.join(", ")}
                    </p>
                    <p>
                      <strong>Medications:</strong>{" "}
                      {samplePatient.medications.join(", ")}
                    </p>
                    <p>
                      <strong>Notes:</strong> {samplePatient.notes}
                    </p>
                    <p>
                      <strong>Emergency Contact:</strong>{" "}
                      {samplePatient.emergencyContact.name}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">
                    Translated Data ({currentLanguage}):
                  </h4>
                  <div className="space-y-2 text-sm bg-blue-50 p-3 rounded">
                    {(() => {
                      const translated = translatePatient(samplePatient);
                      return (
                        <>
                          <p>
                            <strong>{t("fullName")}:</strong> {translated.name}
                          </p>
                          <p>
                            <strong>{t("address")}:</strong>{" "}
                            {translated.address}
                          </p>
                          <p>
                            <strong>{t("conditions")}:</strong>{" "}
                            {translated.conditions.join(", ")}
                          </p>
                          <p>
                            <strong>{t("medications")}:</strong>{" "}
                            {translated.medications.join(", ")}
                          </p>
                          <p>
                            <strong>{t("notes")}:</strong> {translated.notes}
                          </p>
                          <p>
                            <strong>{t("emergencyContact")}:</strong>{" "}
                            {translated.emergencyContact.name}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample Reminder Data */}
        {sampleReminder && (
          <Card>
            <CardHeader>
              <CardTitle>
                {t("reminderDetails")} - Dynamic Translation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Original Data (Keys):</h4>
                  <div className="space-y-2 text-sm font-mono bg-gray-100 p-3 rounded">
                    <p>
                      <strong>Title:</strong> {sampleReminder.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {sampleReminder.description}
                    </p>
                    <p>
                      <strong>Assigned By:</strong> {sampleReminder.assignedBy}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">
                    Translated Data ({currentLanguage}):
                  </h4>
                  <div className="space-y-2 text-sm bg-green-50 p-3 rounded">
                    {(() => {
                      const patientName = samplePatient
                        ? translatePatient(samplePatient).name
                        : "Unknown";
                      const translated = translateReminder(
                        sampleReminder,
                        patientName
                      );
                      return (
                        <>
                          <p>
                            <strong>{t("title")}:</strong> {translated.title}
                          </p>
                          <p>
                            <strong>{t("description")}:</strong>{" "}
                            {translated.description}
                          </p>
                          <p>
                            <strong>Assigned By:</strong>{" "}
                            {translated.assignedBy}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* UI Translation Demo */}
        <Card>
          <CardHeader>
            <CardTitle>UI Translation Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-semibold">{t("home")}</p>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <p className="font-semibold">{t("patients")}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded">
                <p className="font-semibold">{t("reminders")}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded">
                <p className="font-semibold">{t("profile")}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p>
                <strong>{t("totalPatients")}:</strong> {patients.length}
              </p>
              <p>
                <strong>{t("upcomingReminders")}:</strong> {reminders.length}
              </p>
              <p>
                <strong>{t("todayTasks")}:</strong>{" "}
                {reminders.filter((r) => r.status === "pending").length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
