import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { BlogSources } from './collections/blog-sources';
import { Certificates } from './collections/certificates';
import { Educations } from './collections/educations';
import { Experiences } from './collections/experiences';
import { Media } from './collections/media';
import { Services } from './collections/services';
import { Socials } from './collections/socials';
import { SponsorTiers } from './collections/sponsor-tiers';
import { Sponsors } from './collections/sponsors';
import { Testimonials } from './collections/testimonials';
import { Users } from './collections/users';
import { AboutPage } from './globals/about-page';
import { Analytics } from './globals/analytics';
import { BlogsPage } from './globals/blogs-page';
import { ContactSection } from './globals/contact-section';
import { Footer } from './globals/footer';
import { HomePage } from './globals/home-page';
import { Navbar } from './globals/navbar';
import { ProjectsPage } from './globals/projects-page';
import { ServicesPage } from './globals/services-page';
import { SiteSettings } from './globals/site-settings';
import { SponsorsPage } from './globals/sponsors-page';
import { TestimonialsPage } from './globals/testimonials-page';
import { VideosPage } from './globals/videos-page';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, 'app', '(payload)', 'admin', 'import-map.ts'),
    },
  },
  collections: [
    Users,
    Media,
    Services,
    Educations,
    Experiences,
    BlogSources,
    Socials,
    SponsorTiers,
    Testimonials,
    Certificates,
    Sponsors,
  ],
  globals: [
    HomePage,
    AboutPage,
    ProjectsPage,
    ServicesPage,
    SponsorsPage,
    BlogsPage,
    VideosPage,
    TestimonialsPage,
    ContactSection,
    Navbar,
    Footer,
    Analytics,
    SiteSettings,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [],
});
