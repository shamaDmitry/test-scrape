interface ListProps {
  title: string;
  ID: string;
  closeDate: string;
  category: string;
  type: string;
  solicitationSummary: string | null;
  attachements: { text: string; href: string | undefined }[];
}

const List = ({
  title,
  ID,
  closeDate,
  category,
  type,
  attachements,
  solicitationSummary,
}: ListProps) => {
  return (
    <div>
      <div>
        Title: <span className="font-bold">{title}</span>
      </div>

      <div>
        ID: <span className="font-bold">{ID}</span>
      </div>

      <div>
        Due / Close Date (EST): <span className="font-bold">{closeDate}</span>
      </div>

      <div>
        Main Category: <span className="font-bold">{category}</span>
      </div>

      <div>
        Solicitation Type: <span className="font-bold">{type}</span>
      </div>

      <div>
        Attachements:{" "}
        <span className="font-bold">
          {attachements.map((link) => {
            return (
              <a
                href={`https://emma.maryland.gov${link.href}`}
                target="_blank"
                className="block"
                key={link.href}
              >
                {link.text}
              </a>
            );
          })}
        </span>
      </div>

      <div>
        Solicitation Summary:
        <span
          className="font-bold"
          dangerouslySetInnerHTML={{ __html: solicitationSummary || "" }}
        />
      </div>
    </div>
  );
};

export default List;
