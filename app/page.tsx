import Head from 'next/head';

import RichTextRenderer from '@/components/RichTextRenderer';

import client from '../lib/contentful';
import { Page } from '../types/contentful';

export default async function Home() {
  const res = await client.getEntries<Page>({ content_type: 'pageLanding', });

  const page = res.items[0].fields

  const {
    title,
    shortDescription,
    featuredImage,
    content,
    author,
    publishedDate,
  } = page.featuredBlogPost.fields;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-8">

      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden transition-transform transform hover:scale-101 hover:shadow-3xl">
        {/* Imagen destacada */}
        <img
          src={featuredImage.fields.file.url}
          alt={featuredImage.fields.description}
          className="w-full h-96 object-cover object-center transition-transform duration-500 hover:scale-105"
        />

        {/* Contenido del post */}
        <div className="p-8">
          {/* Título */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          {/* Descripción corta */}
          <p className="text-gray-600 text-xl mb-8 font-light">
            {shortDescription}
          </p>

          {/* Autor y fecha */}
          <div className="flex items-center space-x-6 mb-8">
            {/* Avatar del autor (si está disponible) */}
            {/* {author.fields.avatar && (
              <img
                src={author.fields.avatar.fields.file.url}
                alt={author.fields.avatar.fields.description}
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
            )} */}
            <div>
              {/* <p className="text-gray-700 font-medium">
                <span className="font-semibold">Autor:</span> {author.fields.name}
              </p> */}
              <p className="text-gray-500 text-sm">
                Publicado el {new Date(publishedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Contenido rich text */}
          <div className="prose prose-xl max-w-none text-gray-700">
            <RichTextRenderer content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}