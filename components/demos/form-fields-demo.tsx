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
import { ComboBox, Input, Select } from "@/components/core/form-fields";

export default function FormFieldsDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    country: "",
    searchItem: null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComboBoxChange = (item: any) => {
    setFormData((prev) => ({ ...prev, searchItem: item }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
  ];

  const searchItems = [
    { id: 1, label: "React", value: "react" },
    { id: 2, label: "TypeScript", value: "typescript" },
    { id: 3, label: "Next.js", value: "nextjs" },
    { id: 4, label: "Tailwind CSS", value: "tailwind" },
    { id: 5, label: "Node.js", value: "nodejs" },
    { id: 6, label: "PostgreSQL", value: "postgresql" },
    { id: 7, label: "MongoDB", value: "mongodb" },
    { id: 8, label: "Docker", value: "docker" },
  ];

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='text-center space-y-4'>
        <h2 className='text-3xl font-bold'>Core Form Fields Collection</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>
          A comprehensive collection of core form field components designed for
          modern web applications. Each component is built with accessibility,
          validation, and customization in mind.
        </p>
      </div>

      {/* Basic Form Fields */}
      <div className='grid md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Input Field</CardTitle>
            <CardDescription>
              Enhanced input field with validation and error handling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              label='Full Name'
              name='name'
              placeholder='Enter your full name'
              value={formData.name}
              onChange={(value) => handleInputChange("name", value)}
              required
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Input</CardTitle>
            <CardDescription>
              Email input with proper type validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              label='Email Address'
              name='email'
              type='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              required
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password Input</CardTitle>
            <CardDescription>
              Secure password field with proper type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              label='Password'
              name='password'
              type='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              required
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Textarea</CardTitle>
            <CardDescription>
              Multi-line text input for longer content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              label='Description'
              name='description'
              placeholder='Tell us about yourself...'
              value={formData.description}
              onChange={(value) => handleInputChange("description", value)}
              isTextarea
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Dropdown</CardTitle>
            <CardDescription>
              Dropdown selection with search and keyboard navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
              options={countries}
              placeholder='Select your country'
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ComboBox</CardTitle>
            <CardDescription>
              Advanced searchable dropdown with virtualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ComboBox
              label='Search Technology'
              items={searchItems}
              value={formData.searchItem}
              onSelect={handleComboBoxChange}
              placeholder='Search for a technology...'
              clearable
            />
          </CardContent>
        </Card>
      </div>

      {/* Unified Form Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Unified Form</CardTitle>
          <CardDescription>
            Complete form example using all core field types together
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid md:grid-cols-2 gap-4'>
              <Input
                label='First Name'
                name='firstName'
                placeholder='Enter first name'
                value=''
                onChange={() => {}}
                required
              />
              <Input
                label='Last Name'
                name='lastName'
                placeholder='Enter last name'
                value=''
                onChange={() => {}}
                required
              />
            </div>

            <Input
              label='Email'
              name='email'
              type='email'
              placeholder='Enter email address'
              value=''
              onChange={() => {}}
              required
            />

            <Input
              label='Password'
              name='password'
              type='password'
              placeholder='Enter password'
              value=''
              onChange={() => {}}
              required
            />

            <Select
              value=''
              onValueChange={() => {}}
              options={countries}
              placeholder='Select country'
            />

            <Input
              label='Bio'
              name='bio'
              placeholder='Tell us about yourself...'
              value=''
              onChange={() => {}}
              isTextarea
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
            What makes our core form fields special
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-3 gap-4'>
            <div className='text-center p-4 border rounded-lg'>
              <div className='text-2xl mb-2'>🎯</div>
              <h4 className='font-semibold mb-2'>Accessible</h4>
              <p className='text-sm text-muted-foreground'>
                Built with ARIA labels and keyboard navigation
              </p>
            </div>
            <div className='text-center p-4 border rounded-lg'>
              <div className='text-2xl mb-2'>⚡</div>
              <h4 className='font-semibold mb-2'>Fast</h4>
              <p className='text-sm text-muted-foreground'>
                Optimized for performance and smooth interactions
              </p>
            </div>
            <div className='text-center p-4 border rounded-lg'>
              <div className='text-2xl mb-2'>🎨</div>
              <h4 className='font-semibold mb-2'>Customizable</h4>
              <p className='text-sm text-muted-foreground'>
                Easy to style and extend for your needs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
