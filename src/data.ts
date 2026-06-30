import { Article } from "./types";

export const PRESET_ARTICLES: Record<string, Article> = {
  "fifa-world-cup": {
    id: "fifa-world-cup",
    title: "FIFA World Cup",
    description: "International association football tournament",
    infobox: {
      wordmarkUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRBxBSb_g-ukxZOoHGOSiN53zYF6VIs6vP8BbIWpzUjnMinAf3fvPdWycaatfxgBn-VZ-ZW6b0NzdDPRmprNkLSB_i6ZvfWu3cCV2QgcYXpLk9UcXYA-0wNByXnUcjPtDSsXTH33qExsXfBX2qonnqSQXr6nMR5D1lj0DCfeEtkudp_EnSlit3wb366hx3qyyeRTviRQJjG6Pq-_z18so50eXWzloHYCcBpt6GPmGlXWFpqE13UxPxEe8kL6c1H2m5d3vYc0E8gESS",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBetZdYeD15OCp01ZMdKCCuKbQAw6BoKrfmEO4sHxRnGroimhSWYnmvOqTxelqRnf4k7gTwEPK8qfYOHeMKbonw7c6WTkdwXPvxeWX2CW_WV59LBPUYcpPrvP63nilE0hgwCfaJ0MofF7XJfzEVi4fJyt35DH677pWeNlkH8z0zUVYforFvR_1D-nD2D1IgwlxznYwQXIyHUSoy-oAcV_4qSCADwegyU_LgUhK3Gclh5QxdJtorzYa5bgvemqTr-bdp4XZLMSjRVXAM",
      imageCaption: "The current trophy, first awarded in 1974",
      rows: [
        { label: "Organiser(s)", value: "FIFA", isLink: true },
        { label: "Founded", value: "1930; 96 years ago" },
        { label: "Region", value: "International" },
        { label: "Teams", value: "48" },
        { label: "Current champions", value: "Argentina (3rd title)", isLink: true },
        { label: "Most championships", value: "Brazil (5 titles)", isLink: true }
      ]
    },
    summary: [
      "The FIFA World Cup is an international association football competition among the senior men's national teams of the members of the Fédération Internationale de Football Association (FIFA), the sport's global governing body. The tournament has been held every four years since the inaugural tournament in 1930, with the exception of 1942 and 1946 due to World War II.",
      "The viewership of the 2018 World Cup was estimated to be 3.57 billion, close to half of the global population, while the engagement with the 2022 World Cup was estimated to be 5 billion, with about 1.5 billion people watching the final match."
    ],
    sections: [
      {
        title: "History",
        content: `The world's first international football match was a challenge match played in Glasgow in 1872 between Scotland and England.

On 28 May 1928, the FIFA Congress in Amsterdam decided to stage a world championship. With Uruguay now two-time official football world champions and to celebrate their centenary of independence in 1930, FIFA named Uruguay as the host country of the inaugural tournament.

The tournament was expanded to 24 teams in 1982, and then to 32 in 1998. On 10 January 2017, FIFA confirmed the 2026 World Cup would have 48 finalist teams.`
      },
      {
        title: "Trophy",
        content: `From 1930 to 1970, the Jules Rimet Trophy was awarded to the winning team. It was renamed in 1946 after the FIFA president who set up the first tournament. Brazil's third victory in 1970 entitled them to keep it permanently.

The current trophy, known as the FIFA World Cup Trophy, was designed by Silvio Gazzaniga. It is 36 cm high, made of solid 18 carat gold and weighs 6.175 kg. The base contains two layers of semi-precious malachite.`
      },
      {
        title: "Format",
        content: `The qualification phase determines which teams qualify for the tournament phase. As of the 2026 World Cup, 48 teams compete for the title at venues within the host nation(s).

The final tournament consists of the group stage, followed by the knockout stage. In the group stage, teams compete within groups of four teams each, with the top two teams from each group advancing.`
      }
    ],
    resultsTable: {
      headers: ["Year", "Host", "Winners"],
      rows: [
        { "Year": "2022", "Host": "Qatar", "Winners": "Argentina" },
        { "Year": "2018", "Host": "Russia", "Winners": "France" },
        { "Year": "2014", "Host": "Brazil", "Winners": "Germany" }
      ]
    }
  },
  "albert-einstein": {
    id: "albert-einstein",
    title: "Albert Einstein",
    description: "Theoretical physicist who developed the theory of relativity",
    infobox: {
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80",
      imageCaption: "Einstein in 1921, receiving the Nobel Prize in Physics",
      rows: [
        { label: "Born", value: "14 March 1879; Ulm, Kingdom of Württemberg, German Empire" },
        { label: "Died", value: "18 April 1955 (aged 76); Princeton, New Jersey, United States" },
        { label: "Citizenship", value: "Germany, Switzerland, United States" },
        { label: "Education", value: "ETH Zurich, University of Zurich" },
        { label: "Known for", value: "General relativity, Special relativity, Photoelectric effect, Mass–energy equivalence (E=mc²)" },
        { label: "Awards", value: "Nobel Prize in Physics (1921), Copley Medal (1925), Max Planck Medal (1929)" }
      ]
    },
    summary: [
      "Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics (alongside quantum mechanics). His work is also known for its influence on the philosophy of science.",
      "He is best known to the general public for his mass–energy equivalence formula E = mc², which has been dubbed 'the world's most famous equation'. He received the 1921 Nobel Prize in Physics 'for his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect', a pivotal step in the development of quantum theory."
    ],
    sections: [
      {
        title: "Early life and education",
        content: `Albert Einstein was born in Ulm, in the Kingdom of Württemberg in the German Empire, on 14 March 1879. His parents were Hermann Einstein, a salesman and engineer, and Pauline Koch.

In 1895, at the age of 16, Einstein took the entrance examinations for the Swiss Federal Polytechnic in Zurich. He failed to reach the required standard in the general part of the examination, but obtained exceptional grades in physics and mathematics.`
      },
      {
        title: "Annus Mirabilis papers",
        content: `In 1905, while working as a patent clerk in Bern, Einstein published four groundbreaking papers in the Annalen der Physik scientific journal. These papers laid the foundation of modern physics and revolutionized the scientific understanding of space, time, mass, and energy.`
      },
      {
        title: "Theory of Relativity",
        content: `Einstein's General Theory of Relativity, published in 1915, proposed that gravity is not a Newtonian force but a geometric property of space and time, or spacetime. This was experimentally confirmed in 1919 by Arthur Eddington's solar eclipse expedition.`
      }
    ],
    resultsTable: {
      headers: ["Year", "Discovery/Paper", "Impact"],
      rows: [
        { "Year": "1905", "Discovery/Paper": "Photoelectric Effect", "Impact": "Founded quantum theory" },
        { "Year": "1905", "Discovery/Paper": "Special Relativity", "Impact": "Unified space and time" },
        { "Year": "1915", "Discovery/Paper": "General Relativity", "Impact": "Explained gravity via spacetime curvature" }
      ]
    }
  },
  "spacex": {
    id: "spacex",
    title: "SpaceX",
    description: "American aerospace manufacturer and space transportation services company",
    infobox: {
      imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=500&auto=format&fit=crop&q=80",
      imageCaption: "Falcon Heavy maiden launch carrying Tesla Roadster",
      rows: [
        { label: "Founder", value: "Elon Musk", isLink: true },
        { label: "Founded", value: "May 6, 2002; 24 years ago" },
        { label: "Headquarters", value: "Hawthorne, California, U.S." },
        { label: "Key people", value: "Elon Musk (CEO & CTO), Gwynne Shotwell (President & COO)" },
        { label: "Services", value: "Orbital launch, satellite internet (Starlink)" },
        { label: "Vehicles", value: "Falcon 9, Falcon Heavy, Dragon 2, Starship" }
      ]
    },
    summary: [
      "Space Exploration Technologies Corp. (SpaceX) is an American aerospace manufacturer, space transportation services, and communications corporation headquartered in Hawthorne, California. It was founded in 2002 by Elon Musk with the goal of reducing space transportation costs to enable the colonization of Mars.",
      "SpaceX manufactures the Falcon 9 and Falcon Heavy launch vehicles, several rocket engines, Cargo Dragon, Crew Dragon spacecraft, and Starlink communications satellites."
    ],
    sections: [
      {
        title: "History and achievements",
        content: `SpaceX was founded in 2002 by Elon Musk, who wanted to create a more affordable and reusable rocket system. After several failed launch attempts with the Falcon 1, SpaceX achieved its first successful orbit in September 2008.

Since then, SpaceX has recorded many historic 'firsts', including the first privately funded liquid-propellant rocket to reach orbit, the first private company to launch, orbit, and recover a spacecraft, and the first private company to send astronauts to the International Space Station.`
      },
      {
        title: "Starlink",
        content: `Starlink is a satellite internet constellation operated by SpaceX, providing satellite Internet access coverage to over 60 countries. It consists of thousands of small satellites in low Earth orbit (LEO), which communicate with designated ground transceivers.`
      },
      {
        title: "Starship",
        content: `Starship is a fully reusable super heavy-lift launch system under development by SpaceX. Comprising a booster stage named Super Heavy and a spacecraft stage named Starship, it is designed to transport crew and cargo to Earth orbit, the Moon, Mars, and beyond.`
      }
    ],
    resultsTable: {
      headers: ["Vehicle", "Status", "Payload to LEO"],
      rows: [
        { "Vehicle": "Falcon 9", "Status": "Active / Reusable", "Payload to LEO": "22,800 kg" },
        { "Vehicle": "Falcon Heavy", "Status": "Active / Reusable", "Payload to LEO": "63,800 kg" },
        { "Vehicle": "Starship", "Status": "In Development", "Payload to LEO": "150,000+ kg" }
      ]
    }
  },
  "olympic-games": {
    id: "olympic-games",
    title: "Olympic Games",
    description: "International multi-sport event",
    infobox: {
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=80",
      imageCaption: "The Olympic flame, symbol of the modern Games",
      rows: [
        { label: "Organiser", value: "International Olympic Committee (IOC)" },
        { label: "First Games", value: "776 BC (Ancient); 1896 (Modern)" },
        { label: "Frequency", value: "Every 4 years (staggered every 2 years between Summer and Winter)" },
        { label: "Headquarters", value: "Lausanne, Switzerland" },
        { label: "President", value: "Thomas Bach" },
        { label: "Official website", value: "olympics.com" }
      ]
    },
    summary: [
      "The Olympic Games are leading international sporting events featuring summer and winter sports competitions in which thousands of athletes from around the world participate in a variety of competitions.",
      "The Olympic Games are considered the world's foremost sports competition with more than 200 nations participating. The Olympic Games are held every four years, with the Summer and Winter Games alternating by occurring every four years but two years apart from each other."
    ],
    sections: [
      {
        title: "Ancient Olympics",
        content: `The Ancient Olympic Games were religious and athletic festivals held every four years at the sanctuary of Zeus in Olympia, Greece. Competition was among representatives of several city-states and kingdoms of Ancient Greece.`
      },
      {
        title: "Modern Revival",
        content: `The Greek interest in reviving the Olympic Games began with the Greek War of Independence from the Ottoman Empire in 1821. In 1894, Pierre de Coubertin founded the International Olympic Committee (IOC), which led to the first modern Games in Athens in 1896.`
      },
      {
        title: "Olympic Symbols",
        content: `The Olympic movement uses symbols to represent the ideals embodied in the Olympic Charter. The Olympic symbol, better known as the Olympic rings, consists of five intertwined rings and represents the unity of the five inhabited continents.`
      }
    ],
    resultsTable: {
      headers: ["Year", "Edition", "Host City", "Host Country"],
      rows: [
        { "Year": "2024", "Edition": "XXXIII", "Host City": "Paris", "Host Country": "France" },
        { "Year": "2021", "Edition": "XXXII", "Host City": "Tokyo", "Host Country": "Japan" },
        { "Year": "2016", "Edition": "XXXI", "Host City": "Rio de Janeiro", "Host Country": "Brazil" }
      ]
    }
  }
};
