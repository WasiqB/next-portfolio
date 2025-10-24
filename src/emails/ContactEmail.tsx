import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export type ContactEmailProps = {
  name: string;
  email: string;
  reason: string;
  message: string;
};

export function ContactEmail({
  name,
  email,
  reason,
  message,
}: ContactEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>New contact form submission from {name}</Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-primary rounded-xl shadow-lg max-w-[600px] mx-auto">
            {/* Header with Logo and Site Title */}
            <Section className="bg-secondary rounded-t-xl px-10 py-8 text-center">
              <Img
                src="https://new.email/static/app/placeholder.png"
                alt="Site Logo"
                className="w-20 h-auto object-cover mx-auto mb-4"
              />
              <Heading className="text-white text-[28px] font-bold m-0">
                Your Website
              </Heading>
              <Text className="text-blue-100 text-[16px] m-0 mt-2">
                Contact Form Submission
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-10 py-8">
              <Heading className="text-gray-800 text-[24px] font-bold mb-6">
                New Contact Form Submission
              </Heading>

              <Text className="text-gray-600 text-[16px] mb-6">
                You have received a new message through your contact form. Here
                are the details:
              </Text>

              {/* Contact Details */}
              <Section className="bg-gray-50 rounded-xl p-[24px] mb-6">
                <Row>
                  <Column>
                    <Text className="text-gray-700 text-[14px] font-semibold mb-[8px] uppercase tracking-wide">
                      Name
                    </Text>
                    <Text className="text-gray-900 text-[16px] mb-[16px] m-0">
                      {name}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <Text className="text-gray-700 text-[14px] font-semibold mb-[8px] uppercase tracking-wide">
                      Email
                    </Text>
                    <Text className="text-gray-900 text-[16px] mb-[16px] m-0">
                      {email}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <Text className="text-gray-700 text-[14px] font-semibold mb-[8px] uppercase tracking-wide">
                      Subject
                    </Text>
                    <Text className="text-gray-900 text-[16px] mb-[16px] m-0">
                      {reason}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <Text className="text-gray-700 text-[14px] font-semibold mb-[8px] uppercase tracking-wide">
                      Message
                    </Text>
                    <Text className="text-gray-900 text-[16px] leading-[24px] m-0 whitespace-pre-wrap">
                      {message}
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-[24px]" />

              <Text className="text-gray-600 text-[14px] leading-[20px]">
                This message was sent through your website's contact form.
                Please respond directly to the sender's email address: {email}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 px-[40px] py-[24px] rounded-b-[8px]">
              <Text className="text-gray-500 text-[12px] text-center m-0">
                Your Website Contact System
              </Text>
              <Text className="text-gray-400 text-[12px] text-center m-0 mt-[8px]">
                © 2025 Your Website. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
