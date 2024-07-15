import { useState } from "react";
import * as cheerio from "cheerio";
import axios from "axios";
import { ITEM_URL, TABLE_URL, selectors } from "../constants";
import List from "./list";

interface attachmentsLinks {
  index: number;
  text: string;
  href: string | undefined;
}

const Form = () => {
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [title, setTitle] = useState("");
  const [ID, setID] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [solicitationSummary, setSolicitationSummary] = useState<string | null>(
    null
  );
  const [attachements, setAttachements] = useState<attachmentsLinks[]>([]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (term) {
      setIsLoading(true);
      setIsLoaded(false);

      const getDetails = async (id: string) => {
        const urlResponse = await axios.get(`${ITEM_URL}/${id}`);
        const $ = cheerio.load(urlResponse.data);

        const summary = $(selectors.SUMMARY).html();
        setSolicitationSummary(summary);

        const attachmentsLinks: attachmentsLinks[] = [];

        $(`${selectors.ATTACHMENTS} > tbody`)
          .children()
          .find("a")
          .map((index, el) => {
            const href = $(el).attr("href");
            const text = $(el).text();

            attachmentsLinks.push({
              index,
              text,
              href,
            });
          });

        setAttachements(attachmentsLinks);

        setIsLoaded(true);
        setIsLoading(false);
      };

      const getData = async (id: string) => {
        const urlResponse = await axios.get(TABLE_URL);
        const $ = cheerio.load(urlResponse.data);

        const targetRow = $(`td:contains(${id})`).parent();

        const rowId = targetRow[0].attribs["data-id"];

        const title = targetRow.find("td:nth-child(3)").text();
        const closeDate = targetRow.find("td:nth-child(5)").text();
        const category = targetRow.find("td:nth-child(7)").text();
        const type = targetRow.find("td:nth-child(8)").text();

        setID(rowId);
        setTitle(title);
        setCloseDate(closeDate);
        setCategory(category);
        setType(type);

        await getDetails(rowId);
      };

      await getData(term);
    }
  };

  return (
    <>
      <form
        className="flex items-center justify-between gap-4 mb-4"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Search..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full p-4 rounded-md border-2 border-gray-300"
        />

        <button
          type="submit"
          className="p-4 rounded-md border-2 border-gray-300 uppercase"
        >
          search
        </button>
      </form>

      {term && isLoaded && (
        <List
          ID={ID}
          attachements={attachements}
          category={category}
          closeDate={closeDate}
          solicitationSummary={solicitationSummary}
          title={title}
          type={type}
        ></List>
      )}

      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full size-11 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      )}
    </>
  );
};

export default Form;
