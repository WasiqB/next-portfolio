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
    <Html lang='en' dir='ltr'>
      <Tailwind>
        <Head />
        <Preview>New contact form submission from {name}</Preview>
        <Body className='bg-gray-100 py-[40px] font-sans'>
          <Container className='bg-primary mx-auto max-w-[600px] rounded-[8px] shadow-lg'>
            {/* Header with Logo and Site Title */}
            <Section className='bg-secondary rounded-t-[8px] px-[40px] py-[32px] text-center'>
              <Img
                src='https://new.email/static/app/placeholder.png'
                alt='Site Logo'
                className='mx-auto mb-[16px] h-auto w-[80px] object-cover'
              />
              <Heading className='m-0 text-[28px] font-bold text-white'>
                Your Website
              </Heading>
              <Text className='m-0 mt-[8px] text-[16px] text-blue-100'>
                Contact Form Submission
              </Text>
            </Section>

            {/* Main Content */}
            <Section className='px-[40px] py-[32px]'>
              <Heading className='mb-[24px] text-[24px] font-bold text-gray-800'>
                New Contact Form Submission
              </Heading>

              <Text className='mb-[24px] text-[16px] text-gray-600'>
                You have received a new message through your contact form. Here
                are the details:
              </Text>

              {/* Contact Details */}
              <Section className='mb-[24px] rounded-[8px] bg-gray-50 p-[24px]'>
                <Row>
                  <Column>
                    <Text className='mb-[8px] text-[14px] font-semibold tracking-wide text-gray-700 uppercase'>
                      Name
                    </Text>
                    <Text className='m-0 mb-[16px] text-[16px] text-gray-900'>
                      {name}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <Text className='mb-[8px] text-[14px] font-semibold tracking-wide text-gray-700 uppercase'>
                      Email
                    </Text>
                    <Text className='m-0 mb-[16px] text-[16px] text-gray-900'>
                      {email}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <Text className='mb-[8px] text-[14px] font-semibold tracking-wide text-gray-700 uppercase'>
                      Subject
                    </Text>
                    <Text className='m-0 mb-[16px] text-[16px] text-gray-900'>
                      {reason}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <Text className='mb-[8px] text-[14px] font-semibold tracking-wide text-gray-700 uppercase'>
                      Message
                    </Text>
                    <Text className='m-0 text-[16px] leading-[24px] whitespace-pre-wrap text-gray-900'>
                      {message}
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Hr className='my-[24px] border-gray-200' />

              <Text className='text-[14px] leading-[20px] text-gray-600'>
                This message was sent through your website&apos;s contact form.
                Please respond directly to the sender&apos;s email address:{' '}
                {email}
              </Text>
            </Section>

            {/* Footer */}
            <Section className='rounded-b-[8px] bg-gray-50 px-[40px] py-[24px]'>
              <Text className='m-0 text-center text-[12px] text-gray-500'>
                Your Website Contact System
              </Text>
              <Text className='m-0 mt-[8px] text-center text-[12px] text-gray-400'>
                © 2025 Your Website. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
