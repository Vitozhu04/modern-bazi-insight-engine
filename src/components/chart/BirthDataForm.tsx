import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = {
  date: string;
  time: string;
  country: string;
  gender: string;
};

type BirthDataPayload = {
  gregorianDate: string;
  longitude: number;
  gender: "Male" | "Female";
};

type BirthDataFormProps = {
  onSubmit?: (payload: BirthDataPayload) => void;
};

const COUNTRY_OPTIONS = [
  { value: "China", label: "China", longitude: 116.4 },
  { value: "United States", label: "United States", longitude: -77.0365 },
  { value: "United Kingdom", label: "United Kingdom", longitude: -0.1276 },
  { value: "Japan", label: "Japan", longitude: 139.6917 },
  { value: "South Korea", label: "South Korea", longitude: 126.978 },
  { value: "Singapore", label: "Singapore", longitude: 103.8198 },
  { value: "Australia", label: "Australia", longitude: 149.1300 },
  { value: "India", label: "India", longitude: 77.2090 },
  { value: "Canada", label: "Canada", longitude: -75.6972 },
];

const BirthDataForm = ({ onSubmit }: BirthDataFormProps) => {
  const [values, setValues] = React.useState<FormState>({
    date: "",
    time: "",
    country: "China",
    gender: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!values.date) nextErrors.date = "Date is required";
    if (!values.time) nextErrors.time = "Time is required";
    if (!values.country) nextErrors.country = "Country is required";
    if (!values.gender) nextErrors.gender = "Gender is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const iso = new Date(`${values.date}T${values.time}:00+08:00`).toISOString();
    const countryLongitude =
      COUNTRY_OPTIONS.find((option) => option.value === values.country)?.longitude ??
      116.4;
    onSubmit?.({
      gregorianDate: iso,
      longitude: countryLongitude,
      gender: values.gender as "Male" | "Female",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Birth date
          <Input
            type="date"
            value={values.date}
            onChange={handleChange("date")}
          />
          {errors.date ? (
            <span className="text-xs text-rose-600">{errors.date}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Birth time
          <Input
            type="time"
            value={values.time}
            onChange={handleChange("time")}
          />
          {errors.time ? (
            <span className="text-xs text-rose-600">{errors.time}</span>
          ) : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Country
          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900"
            value={values.country}
            onChange={handleChange("country")}
          >
            {COUNTRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.country ? (
            <span className="text-xs text-rose-600">{errors.country}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Gender
          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900"
            value={values.gender}
            onChange={handleChange("gender")}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender ? (
            <span className="text-xs text-rose-600">{errors.gender}</span>
          ) : null}
        </label>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Times are interpreted using China Standard Time for consistency.
        </p>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default BirthDataForm;
