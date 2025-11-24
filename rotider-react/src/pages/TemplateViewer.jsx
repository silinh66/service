import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import templates from '../data/templates.json';

const TemplateViewer = () => {
    const { id } = useParams();
    const [template, setTemplate] = useState(null);

    useEffect(() => {
        const foundTemplate = templates.find(t => t.id === parseInt(id));
        setTemplate(foundTemplate);
    }, [id]);

    if (!template) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Back Button Overlay */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '10px 20px',
                borderRadius: '30px',
            }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                    <span>&larr;</span> Back to Home
                </Link>
            </div>

            {/* Iframe */}
            <iframe
                src={template.externalLink || template.link} // Fallback to local link if external not found
                style={{ width: '100%', height: '100%', border: 'none' }}
                title={template.title}
            />
        </div>
    );
};

export default TemplateViewer;
