import { postgresAdapter } from '@payloadcms/db-postgres';
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { BlogSources } from './collections/blog-sources';
import { Educations } from './collections/educations';
import { Experiences } from './collections/experiences';
import { Media } from './collections/media';
import { Services } from './collections/services';
import { Socials } from './collections/socials';
import { SponsorTiers } from './collections/sponsor-tiers';
import { Sponsors } from './collections/sponsors';
import { Testimonials } from './collections/testimonials';
import { Users } from './collections/users';
import { HomePage } from './globals/home-page';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
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
    Sponsors,
  ],
  globals: [HomePage],
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
