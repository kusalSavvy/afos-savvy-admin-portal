"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserProfile } from "@/features/profile/profile.types";

type ProfileInformationFormProps = {
  profile: UserProfile;
  onSave?: (profile: UserProfile) => void;
  onCancel?: () => void;
};

export function ProfileInformationForm({
  profile,
  onSave,
  onCancel,
}: ProfileInformationFormProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);

  function updateField<K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);

    onSave?.(formData);

    setIsSaving(false);
  }

  function handleCancel() {
    setFormData(profile);
    onCancel?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your personal details and contact information.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first-name">
            First name
          </Label>

          <Input
            id="first-name"
            value={formData.firstName}
            onChange={(event) =>
              updateField("firstName", event.target.value)
            }
            placeholder="Enter first name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last-name">
            Last name
          </Label>

          <Input
            id="last-name"
            value={formData.lastName}
            onChange={(event) =>
              updateField("lastName", event.target.value)
            }
            placeholder="Enter last name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email address
          </Label>

          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            placeholder="Enter email address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone number
          </Label>

          <Input
            id="phone"
            type="tel"
            value={formData.phone ?? ""}
            onChange={(event) =>
              updateField("phone", event.target.value)
            }
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="job-title">
            Job title
          </Label>

          <Input
            id="job-title"
            value={formData.jobTitle ?? ""}
            onChange={(event) =>
              updateField("jobTitle", event.target.value)
            }
            placeholder="Enter job title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">
            Department
          </Label>

          <Input
            id="department"
            value={formData.department ?? ""}
            onChange={(event) =>
              updateField("department", event.target.value)
            }
            placeholder="Enter department"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">
            Location
          </Label>

          <Input
            id="location"
            value={formData.location ?? ""}
            onChange={(event) =>
              updateField("location", event.target.value)
            }
            placeholder="Enter location"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time-zone">
            Time zone
          </Label>

          <Input
            id="time-zone"
            value={formData.timeZone ?? ""}
            onChange={(event) =>
              updateField("timeZone", event.target.value)
            }
            placeholder="Enter time zone"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isSaving}
          onClick={handleCancel}
          className="rounded-xl"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-[#ed1b64] text-white hover:bg-[#cf1556]"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}