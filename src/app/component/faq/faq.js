"use client";

import Section from "../layouts/Section.js";
import styles from "./faq.module.css";
import Link from "next/link";
import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
  {
    category: "General Information",
    questions: [
      {
        question: "What is TreeTherium?",
        answer:
          "TreeTherium is a pioneering platform that combines blockchain technology with environmental conservation. We tokenize tree planting programs, making them transparent, efficient, and accessible to individuals and organizations worldwide.",
      },
      {
        question: "How does TreeTherium work?",
        answer:
          "TreeTherium uses blockchain technology to create digital tokens that represent real trees planted in reforestation projects. Contributors can purchase these tokens, track their impact in real-time, and support global reforestation efforts. We reimburse tree planters with $TREE tokens for their hard work.",
      },
      {
        question: "Who founded TreeTherium?",
        answer:
          "TreeTherium was co-founded by Frank Amptmeijer, a techpreneur. Our Founders Circle team further includes Matthias Gelber, an environmentalist known as the Green Man, and Kwai Nam Loh, a cryptocurrency specialist and trainer.",
      },
      {
        question: "What is the mission of TreeTherium?",
        answer:
          "Our mission is to reforest the planet using blockchain technology, ensuring transparency, scalability, and long-term sustainability in global reforestation efforts. We aim to restore forests, enhance biodiversity, and combat climate challenges.",
      },
      {
        question: "How can I get involved with TreeTherium?",
        answer:
          "You can get involved by partnering with us or spreading the word about our mission. You can join our DAO or download the app and earn $TREE tokens for your tree planting efforts. Visit our website for more details on how to contribute and participate.",
      },
    ],
  },
  {
    category: "Technical Details",
    questions: [
      {
        question: "What is tokenizing tree planting?",
        answer:
          "Tokenizing tree planting involves creating digital tokens on the blockchain that represent real trees planted in reforestation projects. These tokens are secure, transparent, and traceable, allowing contributors to support and monitor reforestation efforts effectively.",
      },
      {
        question: "Why did TreeTherium choose Solana?",
        answer:
          "TreeTherium chose Solana for its high throughput, low transaction costs, robust security, and energy efficiency. Solana’s carbon-neutral approach aligns with our mission to provide a scalable and environmentally conscious platform.",
      },
      {
        question: "How are the tokens created and managed?",
        answer:
          "Tokens are created for each reforestation project based on the number of trees to be planted. They are stored and managed on the Solana blockchain, ensuring transparency and traceability for every transaction.",
      },
      {
        question: "How does blockchain technology ensure transparency?",
        answer:
          "Blockchain technology records every transaction on a decentralized ledger, making it transparent and immutable. This ensures that all contributions to TreeTherium’s projects are traceable and verifiable, building trust among donors and stakeholders.",
      },
      {
        question: "What security measures are in place?",
        answer:
          "TreeTherium uses Solana’s robust security protocols, including Proof of History (PoH) and Proof of Stake (PoS) mechanisms, to ensure the integrity and security of our blockchain.",
      },
    ],
  },
  {
    category: "Contributions & Participation",
    questions: [
      {
        question: "How can I contribute to TreeTherium?",
        answer:
          "You can contribute by purchasing tokens through our platform. Each token represents a tree planted in a reforestation project. Your contributions help fund and support these projects directly.",
      },
      {
        question: "How are my contributions used?",
        answer:
          "Your contributions are used to fund tree planting and maintenance activities in reforestation projects. We collaborate with local communities and environmental experts to ensure that each project is sustainable and impactful.",
      },
      {
        question: "Can I track the impact of my contributions?",
        answer:
          "Yes, absolutely. You can track the progress and impact of your contributions in real-time through our platform. The blockchain technology ensures that all transactions and project updates are transparent and accessible.",
      },
      {
        question:
          "What types of reforestation projects does TreeTherium support?",
        answer:
          "TreeTherium supports a variety of reforestation projects, including tropical rainforest restoration, mangrove reforestation, urban greening, and agroforestry development. Each project is designed to address specific environmental needs and promote sustainability.",
      },
      {
        question: "How do I become a partner with TreeTherium?",
        answer:
          "To become a partner, please contact us through our website, Twitter, Discord, DAO, or Mobile Application. We welcome collaborations with environmental NGOs, local communities, governments, and private sector organizations.",
      },
    ],
  },
];

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title="Frequently Asked Questions"
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;All Your Answers Together On One Page&quot;
          </h3>
        </div>
        <div>
          <div style={{ padding: "2rem",marginTop:"-20px" }}>
            {faqData.map((section, index) => (
              <div key={index}>
                <Typography
                  variant="h4"
                  className={styles.title}
                >
                  {section.category}
                </Typography>
                {section.questions.map((item, idx) => (
                  <Accordion
                    key={idx}
                    expanded={expanded === `panel${index}-${idx}`}
                    onChange={handleChange(`panel${index}-${idx}`)}
                    className={styles.accordion}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      className={`${styles.summary} ${
                        expanded === `panel${index}-${idx}` ? styles.expanded : ""
                      }`}
                      style={{
                        backgroundColor: expanded === `panel${index}-${idx}` ? "#f0f0f0" : "#fff",
                      }}
                      
                    >
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles.details}>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
