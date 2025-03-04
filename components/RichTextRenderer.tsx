import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';

// Define opciones para personalizar el renderizado
const options = {
    renderNode: {
        // Renderizar párrafos
        [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,

        // Renderizar encabezados
        [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
        [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
        [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,

        // Renderizar enlaces
        [INLINES.HYPERLINK]: (node, children) => {
            const { uri } = node.data;
            return (
                <Link href={uri} target="_blank" rel="noopener noreferrer">
                    {children}
                </Link>
            );
        },

        // Renderizar imágenes (si las hay)
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { title, file } = node.data.target.fields;
            const imageUrl = `https:${file.url}`;
            return <img src={imageUrl} alt={title} />;
        },
    },
};

interface RichTextRendererProps {
    content: any; // El campo `content` de Contentful
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
    return <div>{documentToReactComponents(content, options)}</div>;
};

export default RichTextRenderer;