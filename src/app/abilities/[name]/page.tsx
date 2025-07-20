import fs from 'fs';
import path from "path";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkWikiLink from 'remark-wiki-link';

async function getAbilityDetails(name: string) {

    const outputFilePath = path.join(process.cwd(), `src/lib/markdown/${name}.md`);

    const fileContent = fs.readFileSync(outputFilePath, 'utf8');



    return fileContent;
}



export default async function AbilityPage({ params }: { params: { name: string } }) {
    const { name } = await params;
    const abilityName = decodeURIComponent(name);
    const ability = await getAbilityDetails(abilityName);

    if (!ability) {
        return <div>Habilidade não encontrada.</div>;
    }


    return (
        <article className="container mx-auto p-8 flex flex-col gap-5">
            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,
                    remarkMath,
                ]}
                rehypePlugins={[
                    rehypeRaw,
                    rehypeKatex
                ]}

            >
                {ability}
            </ReactMarkdown>
        </article>
    );
}