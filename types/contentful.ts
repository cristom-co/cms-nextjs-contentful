import { EntrySkeletonType } from 'contentful';

// Interfaz para el campo featuredImage
export interface FeaturedImage {
    fields: {
        file: {
            url: string;
        };
        description: string;
    };
}

// Interfaz para el campo author
export interface Author {
    fields: {
        name: string;
    };
}

// Interfaz para el campo featuredBlogPost
export interface FeaturedBlogPost {
    fields: {
        title: string;
        shortDescription: string;
        featuredImage: FeaturedImage;
        content: any; // Puedes usar `Document` de @contentful/rich-text-types para rich text
        author: Author;
        publishedDate: string;
    };
}

// Interfaz para el campo seoFields
export interface SeoFields {
    fields: {
        pageTitle: string;
        pageDescription: string;
    };
}

// Interfaz principal para Page
export interface Page extends EntrySkeletonType {
    fields: {
        featuredBlogPost: FeaturedBlogPost;
        seoFields: SeoFields;
    };
}