"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, Select } from "@/components/core/form-fields";

export default function CoreFormFieldsDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Core form submitted:", formData);
  };

  const roles = [
    { value: "developer", label: "Developer" },
    { value: "designer", label: "Designer" },
    { value: "manager", label: "Manager" },
    { value: "analyst", label: "Analyst" },
  ];

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='text-center space-y-4'>
        <h2 className='text-3xl font-bold'>Core Form Fields</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>
          Essential form field components from the core library. These are the
          building blocks for creating robust and accessible forms.
        </p>
      </div>

      {/* Core Form Fields */}
      <div className='grid md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Core Input</CardTitle>
            <CardDescription>
              Basic input field with validation and error handling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              label='Full Name'
              name='fullName'
              placeholder='Enter your full name'
              value={formData.name}
              onChange={(value) => handleInputChange("name", value)}
              required
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core Select</CardTitle>
            <CardDescription>
              Dropdown selection component with options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              placeholder='Select your role'
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
              options={roles}
            />
          </CardContent>
        </Card>
      </div>

      {/* Complete Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Form Example</CardTitle>
          <CardDescription>
            Using core form fields together in a complete form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid md:grid-cols-2 gap-4'>
              <Input
                label='First Name'
                name='firstName'
                placeholder='Enter first name'
                value={formData.name}
                onChange={(value) => handleInputChange("name", value)}
                required
              />
              <Input
                label='Email'
                name='email'
                type='email'
                placeholder='Enter email address'
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                required
              />
            </div>

            <Select
              placeholder='Select your role'
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
              options={roles}
            />

            <div className='flex justify-end'>
              <Button type='submit' className='bg-teal-600 hover:bg-teal-700'>
                Submit Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Features Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Core Features</CardTitle>
          <CardDescription>
            What makes our core form fields reliable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-3 gap-4'>
            <div className='text-center p-4 border rounded-lg'>
              <div className='text-2xl mb-2'>🛡️</div>
              <h4 className='font-semibold mb-2'>Reliable</h4>
              <p className='text-sm text-muted-foreground'>
                Battle-tested components for production use
              </p>
            </div>
            <div className='text-center p-4 border rounded-lg'>
              <div className='text-2xl mb-2'>♿</div>
              <h4 className='font-semibold mb-2'>Accessible</h4>
              <p className='text-sm text-muted-foreground'>
                WCAG compliant with proper ARIA support
              </p>
            </div>
            <div className='text-center p-4 border rounded-lg'>
              <div className='text-2xl mb-2'>🔧</div>
              <h4 className='font-semibold mb-2'>Flexible</h4>
              <p className='text-sm text-muted-foreground'>
                Easy to customize and extend
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
