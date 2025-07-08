'use client';

import Form from "./form";

interface FormResult {
    success: boolean;
    message?: string;
    data?: {
        name: string;
        message: string;
    };
}

function Contact() {
  const handleFormSubmit = (result: FormResult) => {
    console.log('Form submitted:', result);
    alert(`Thanks, we'll get back to you soon`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-12 text-gray-800 dark:text-neutral-200">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-4">
          Have questions, suggestions, or would like to contribute any pictures?
        </p>
        <p className="mb-4">
          Reach out to us for any queries, feedback, or contributions. We value your input and are here to help! You can contribute images by sending a Google Drive link. Ensure the images have location tags.
        </p>
      </div>
      <div className=" mx-auto">
        <Form onSubmit={handleFormSubmit} />
      </div>

    </div>
  );
}

export default Contact;
