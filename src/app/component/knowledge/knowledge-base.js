import Section from "../../component/layouts/Section.js";
import Link from "next/link";

const knowledgeBaseSections = [
  {
    name: "TreeTherium",
    pages: [
      {
        name: "What is TreeTherium",
        link: "/knowledge-base/what-is-treetherium",
      },
      {
        name: "Why Solana",
        link: "/knowledge-base/why-solana",
      },
      {
        name: "Investors",
        link: "/knowledge-base/investors",
      },
    ],
  },
  {
    name: "Blockchain & Crypto",
    pages: [
      {
        name: "NFT's & Tree Planting",
        link: "/knowledge-base/nfts-tree-planting",
      },
      {
        name: "What Is Crypto",
        link: "/knowledge-base/what-is-crypto",
      },
      {
        name: "What Is A Crypto Wallet",
        link: "/knowledge-base/what-is-a-crypto-wallet",
      },
      {
        name: "What Is Blockchain",
        link: "/knowledge-base/what-is-blockchain",
      },
      {
        name: "Create A Phantom Wallet",
        link: "/knowledge-base/create-a-phantom-wallet",
      },
      {
        name: "Create A Jupiter Account",
        link: "/knowledge-base/create-a-jupiter-account",
      },
      {
        name: "Create A Raydium Account",
        link: "/knowledge-base/create-a-raydium-account",
      },
    ],
  },
  {
    name: "Reforestation",
    pages: [
      {
        name: "Landowners",
        link: "/knowledge-base/landowners",
      },
    ],
  },
  {
    name: "Tree Planting",
    pages: [
      {
        name: "Tree Planting General",
        link: "/knowledge-base/tree-planting-general",
      },
    ],
  },
];

const KnowledgeBase = () => {
  return (
    <Section allNotification={false} searchPopup={true} title="Knowledge Base">
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">&quot;knowledge empowers people&quot;</h3>
        </div>
        <div style={styles.card}>
          {knowledgeBaseSections.map((section, index) => (
            <div key={index}>
              <h3 style={styles.title}>{section.name}</h3>
              <div style={styles.divider} />
              {section.pages.map((page, pageIndex) => (
                <h3
                  key={pageIndex}
                  style={{
                    ...styles.page,
                    marginBottom:
                      pageIndex === section.pages.length - 1 ? "28px" : "0px",
                  }}
                >
                  <Link href={page.link}>
                    <span className="underline-text">{page.name}</span>
                  </Link>
                </h3>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default KnowledgeBase;

const styles = {
  card: {
    backgroundColor: "#fff" /* White background for the card */,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" /* Soft shadow */,
    textAlign: "left" /* Left-align content */,
    padding: "1.25rem" /* Inner padding */,
    maxWidth: "100%" /* Max width for the card */,
    margin: "21px 20px 100px",
  },
  title: {
    fontSize: "1.125em",
    fontWeight: 700,
    color: "#4F3738",
    padding: "5px 34px",
    marginBottom: "0px",
  },
  divider: {
    width: "100%",
    height: "4px",
    margin: "0 0 32px",
    borderRadius: "50px",
    backgroundColor: "#e7e1ee",
  },
  page: {
    fontSize: "1.125em",
    fontWeight: 400,
    color: "#4F3738",
    padding: "0 0 11px 55px",
    marginBottom: "0px",
  },
  // Adding a responsive layout to make sure the text and dividers adjust well to screen size
  "@media (min-width: 600px)": {
    card: {
      maxWidth: "80%", // Limit card width on medium screens
    },
  },
  "@media (min-width: 1024px)": {
    card: {
      maxWidth: "600px", // Limit card width on larger screens
    },
    title: {
      fontSize: "1.5rem",
    },
    page: {
      fontSize: "1.125rem",
    },
  },
};
