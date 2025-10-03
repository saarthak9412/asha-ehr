"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  User,
  MapPin,
  Calendar,
  AlertTriangle,
  Heart,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";
import { usePatients } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";
import { useTranslatedData } from "@/lib/dataHelpers";

const riskConfig = {
  Low: { color: "text-green-600", bg: "bg-green-100", icon: CheckCircle },
  Medium: { color: "text-yellow-600", bg: "bg-yellow-100", icon: Clock },
  High: { color: "text-red-600", bg: "bg-red-100", icon: AlertTriangle },
};

const riskLevelConfig = {
  Low: {
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  Medium: {
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  High: { color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

export default function PatientsScreen() {
  const { t } = useTranslation();
  const { patients } = usePatients();
  const { translatePatient } = useTranslatedData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPatients = useMemo(() => {
    let filtered = patients;

    // Apply search filter with translated data
    if (searchQuery) {
      filtered = filtered.filter((patient: any) => {
        const translatedPatient = translatePatient(patient);
        return (
          translatedPatient.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          translatedPatient.address
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          translatedPatient.conditions.some((condition: string) =>
            condition.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      });
    }

    // Apply status filter
    if (selectedFilter !== "all") {
      if (selectedFilter === "critical") {
        filtered = filtered.filter(
          (patient: any) => patient.riskLevel === "High"
        );
      } else if (selectedFilter === "pregnant") {
        filtered = filtered.filter(
          (patient: any) =>
            patient.pregnancyInfo?.isPregnant ||
            patient.conditions.some((c: string) =>
              c.toLowerCase().includes("pregnancy")
            )
        );
      } else if (selectedFilter === "children") {
        filtered = filtered.filter((patient: any) => patient.age < 18);
      } else if (selectedFilter === "recent") {
        // Filter by last visit in last 7 days
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter((patient: any) => {
          const lastVisit = new Date(patient.lastVisit);
          return lastVisit >= weekAgo;
        });
      }
    }

    return filtered;
  }, [patients, searchQuery, selectedFilter, translatePatient]);

  const filterOptions = [
    { value: "all", label: t("all"), count: patients.length },
    {
      value: "critical",
      label: t("critical"),
      count: patients.filter((p: any) => p.riskLevel === "High").length,
    },
    {
      value: "pregnant",
      label: t("pregnant"),
      count: patients.filter(
        (p: any) =>
          p.pregnancyInfo?.isPregnant ||
          p.conditions.some((c: string) =>
            c.toLowerCase().includes("pregnancy")
          )
      ).length,
    },
    {
      value: "children",
      label: t("children"),
      count: patients.filter((p: any) => p.age < 18).length,
    },
    {
      value: "recent",
      label: "Recent Visits",
      count: patients.filter((p: any) => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(p.lastVisit) >= weekAgo;
      }).length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white px-6 pt-12 pb-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <Link href="/patients/new">
            <Button size="sm" className="h-10">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search patients, villages, conditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
          >
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Filter Chips */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="space-y-2"
          >
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === option.value
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Patients List */}
      <div className="p-6">
        {filteredPatients.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Patients Found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try adjusting your search or filter criteria"
                : "Start by adding your first patient record"}
            </p>
            <Link href="/patients/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Patient
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredPatients.map((patient: any, index: number) => {
              const RiskIcon =
                riskConfig[patient.riskLevel as keyof typeof riskConfig]
                  ?.icon || CheckCircle;
              const riskStyle =
                riskLevelConfig[
                  patient.riskLevel as keyof typeof riskLevelConfig
                ];

              // Translate patient data
              const translatedPatient = translatePatient(patient);

              return (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/patients/${patient.id}`}>
                    <Card
                      className={`hover:shadow-lg transition-all ${riskStyle?.border}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          {/* Patient Avatar */}
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>

                          {/* Patient Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {translatedPatient.name}
                              </h3>
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full ${riskStyle.bg} ${riskStyle.color}`}
                              >
                                {patient.riskLevel} Risk
                              </span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>
                                  {translatedPatient.address.split(",")[0]} •{" "}
                                  {t("age")} {patient.age}
                                </span>
                              </div>

                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-3 h-3 mr-1" />
                                <span>
                                  {t("lastVisit")}:{" "}
                                  {new Date(
                                    patient.lastVisit
                                  ).toLocaleDateString()}
                                </span>
                              </div>

                              {translatedPatient.conditions.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {translatedPatient.conditions
                                    .slice(0, 2)
                                    .map(
                                      (
                                        condition: string,
                                        condIndex: number
                                      ) => (
                                        <span
                                          key={condIndex}
                                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg"
                                        >
                                          {condition}
                                        </span>
                                      )
                                    )}
                                  {translatedPatient.conditions.length > 2 && (
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">
                                      +{translatedPatient.conditions.length - 2}{" "}
                                      {t("more")}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Risk Level Indicator */}
                          <div className="flex flex-col items-end space-y-2">
                            <RiskIcon
                              className={`w-5 h-5 ${riskStyle.color}`}
                            />

                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${riskStyle.bg} ${riskStyle.color}`}
                            >
                              {patient.riskLevel}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Results Count */}
        {filteredPatients.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-500">
              Showing {filteredPatients.length} of {patients.length} patients
            </p>
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
