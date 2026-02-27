/**
 * Schema Markup Component
 * Generates structured data for SEO
 */

interface SchemaMarkupProps {
  type: 'organization' | 'course' | 'review' | 'breadcrumb';
  data?: Record<string, any>;
}

export const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'VR Robotics Academy',
          url: 'https://vrroboticsacademy.com',
          logo: 'https://vrroboticsacademy.com/logo.png',
          description: 'Master robotics, VR development, and AI through hands-on projects',
          sameAs: [
            'https://www.facebook.com/vrroboticsacademy',
            'https://www.twitter.com/vrroboticsacademy',
            'https://www.instagram.com/vrroboticsacademy',
            'https://www.linkedin.com/company/vrroboticsacademy',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            telephone: '+91 7483430092',
            email: 'info@vrroboticsacademy.com',
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Innovation Drive',
            addressLocality: 'Tech Valley',
            addressRegion: 'CA',
            postalCode: '94025',
            addressCountry: 'US',
          },
        };

      case 'course':
        return {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: data?.name || 'VR Robotics Academy Program',
          description: data?.description || 'Master robotics, VR development, and AI through hands-on projects',
          provider: {
            '@type': 'Organization',
            name: 'VR Robotics Academy',
            sameAs: 'https://vrroboticsacademy.com',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '1200',
          },
          offers: {
            '@type': 'Offer',
            price: data?.price || '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        };

      case 'review':
        return {
          '@context': 'https://schema.org',
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: data?.rating || '5',
            bestRating: '5',
            worstRating: '1',
          },
          reviewBody: data?.body || 'Great learning experience',
          author: {
            '@type': 'Person',
            name: data?.author || 'Student',
          },
          datePublished: data?.date || new Date().toISOString(),
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data?.items || [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://vrroboticsacademy.com',
            },
          ],
        };

      default:
        return null;
    }
  };

  const schema = getSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Organization Schema - Add to Layout
 */
export const OrganizationSchema = () => (
  <SchemaMarkup type="organization" />
);

/**
 * Course Schema - Add to Course Pages
 */
export const CourseSchema = (props: Record<string, any>) => (
  <SchemaMarkup type="course" data={props} />
);

/**
 * Review Schema - Add to Testimonials
 */
export const ReviewSchema = (props: Record<string, any>) => (
  <SchemaMarkup type="review" data={props} />
);

/**
 * Breadcrumb Schema - Add to Navigation
 */
export const BreadcrumbSchema = (items: Array<{ name: string; path: string }>) => (
  <SchemaMarkup
    type="breadcrumb"
    data={{
      items: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `https://vrroboticsacademy.com${item.path}`,
      })),
    }}
  />
);
