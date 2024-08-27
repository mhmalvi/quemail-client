import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background-color">
      <Navbar />
      <div className=" max-w-4xl p-6 bg-dark-glass shadow-lg rounded-lg mt-32">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
          Terms and Conditions
        </h1>

        <div className="space-y-6 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              1. Introduction
            </h2>
            <p>
              Welcome to Quemailer, an email marketing service provided by
              Quadque Technologies Pty Limited. By using our website and
              services, you agree to comply with and be bound by these terms and
              conditions.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              2. Services Provided
            </h2>
            <p>
              Quemailer offers mass mailing services, including email campaigns,
              list management, and analytics. We reserve the right to modify,
              suspend, or discontinue any part of the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              3. User Responsibilities
            </h2>
            <p>
              You agree to use Quemailer in compliance with all applicable laws
              and regulations, including anti-spam laws. You must not use our
              service to send unsolicited, fraudulent, or misleading emails.
              Users are responsible for maintaining the security of their
              account credentials and for all activities conducted through their
              account.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              4. Payment and Fees
            </h2>
            <p>
              All fees for Quemailer services are outlined on our pricing page
              and are subject to change. Payments must be made in accordance
              with the terms specified during the signup process. We reserve the
              right to suspend or terminate services for non-payment.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              5. Intellectual Property
            </h2>
            <p>
              All content on this site, including text, graphics, logos, and
              software, is the property of Quemailer or its licensors and is
              protected by intellectual property laws. Unauthorized use of any
              content is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              6. Limitation of Liability
            </h2>
            <p>
              Quemailer will not be liable for any indirect, incidental, or
              consequential damages arising from the use of our services,
              including but not limited to loss of data, revenue, or profits.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              7. Termination of Services
            </h2>
            <p>
              Either party may terminate the service at any time by providing
              written notice. Upon termination, user data will be retained for a
              limited period, after which it will be deleted in accordance with
              our data retention policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              8. Privacy Policy
            </h2>
            <p>
              Our use of your personal information is governed by our Privacy
              Policy, which is incorporated into these terms by reference. By
              using Quemailer, you agree to our collection, use, and sharing of
              your information as described in the Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              9. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by the laws of Bangladesh,
              without regard to its conflict of law provisions. Any disputes
              arising from the use of our services will be subject to the
              jurisdiction of the courts of Bangladesh.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">10. Amendments</h2>
            <p>
              We reserve the right to modify these terms and conditions at any
              time. Any changes will be effective immediately upon posting to
              our website. It is your responsibility to review the terms
              regularly.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold">
              11. Contact Information
            </h2>
            <p>
              For any questions regarding these terms, please contact us at
              support@quemailer.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
