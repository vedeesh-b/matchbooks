import PathGrid from "@/components/features/PathGrid";
import SearchBar from "@/components/features/SearchBar";
import { useGeneratePath } from "@/hooks/useGeneratePath";

export default function PathGenerator() {
  const { generatePath, generateRandomPath, readingPath, isGenerating } =
    useGeneratePath();

  return (
    <div>
      <h1 className="scroll-m-20 text-5xl font-bold tracking-tight pt-14 pb-6">
        Path Generator
      </h1>
      <p className="text-gray-600 pb-14 w-[54%]">
        Find yourself a reading path using a seed book that you already like.
        For something fresh, our random generator has you covered.
      </p>
      <SearchBar
        generatePath={generatePath}
        generateRandomPath={generateRandomPath}
        isGenerating={isGenerating}
      />
      <PathGrid books={readingPath} />
    </div>
  );
}
