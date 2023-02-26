import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
function App() {
  const [path, setPath] = useState("");
  const [fileContent, setFileContent] = useState("");
  const readFileContents = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        filters: [
          {
            name: "txt filter",
            extensions: ["txt"],
          },
        ],
      });
      if (selectedPath) {
        setPath(selectedPath as string);
      }
      const content = await readTextFile(selectedPath as string);
      console.log(content);
      setFileContent(content);
    } catch (err) {
      console.error(err);
    }
  };
  const save = async () => {
    await writeTextFile(path, fileContent);
  };
  return (
    <section className="flex flex-col justify-start gap-4 items-center mt-4 h-full">
      <article>
        <button
          onClick={readFileContents}
          className="bg-zinc-800 w-80 h-10 rounded-lg text-2xl hover:bg-zinc-500 mr-8"
        >
          Choose text file to edit
        </button>

        <button
          onClick={save}
          className="bg-zinc-800 w-80 h-10 rounded-lg text-2xl hover:bg-zinc-500 ml-8"
        >
            Save
        </button>
      </article>

      {path !== "" ? (
        <>
          <h2>{fileContent}</h2>
          <article>
            <textarea
              className="bg-zinc-800"
              name="text-content"
              id=""
              cols={100}
              rows={25}
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
            />
          </article>
        </>
      ) : (
        ""
      )}
    </section>
  );
}

export default App;
