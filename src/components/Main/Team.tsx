// Team.tsx
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { classMap } from "../Tools/Misc";



const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "linkedin":
      return <i className="fab fa-linkedin" aria-label="Facebook" />;
    case "x":
      return <i className="fab fa-twitter" aria-label="Twitter" />;
    case "facebook":
      return <i className="fab fa-facebook" aria-label="Facebook" />;
    case "reddit":
      return <i className="fab fa-reddit" aria-label="Reddit" />;
    case "instagram":
      return <i className="fab fa-instagram" aria-label="Instagram" />;
    case "pinterest":
      return <i className="fab fa-pinterest" aria-label="Pinterest" />;
    case "github":
      return <i className="fab fa-github" aria-label="GitHub" />;
    case "stackoverflow":
      return <i className="fab fa-stack-overflow" aria-label="Stack Overflow" />;
    case "medium":
      return <i className="fab fa-medium" aria-label="Medium" />;
    case "behance":
      return <i className="fab fa-behance" aria-label="Behance" />;
    case "dribbble":
      return <i className="fab fa-dribbble" aria-label="Dribbble" />;
    case "personal_website":
    case "website":
      return <i className="fas fa-globe" aria-label="Website" />;
    case "angel":
      return <i className="fab fa-angellist" aria-label="AngelList" />;
    case "researchgate":
      return <i className="fab fa-researchgate" aria-label="ResearchGate" />;
    case "orcid":
      return <i className="ai ai-orcid" aria-label="ORCID" />;
    default:
      return null;
  }
};

export const Team = ({teamData}) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const handleBack = () => setSelectedMember(null);

  return (
    <section className="py-10 bg-[#0e0f10] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Fade direction="up" triggerOnce>
          <h2 className="text-4xl font-bold mb-5 text-[#4db8ff]">Meet the Team</h2>
          <h6 className="text-gray-400 max-w-3xl mx-auto mb-16">
            Our team is a diverse group of seasoned entrepreneurs, financial experts, and blockchain pioneers.
          </h6>
        </Fade>

        {!selectedMember ? (
          <Fade cascade triggerOnce>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamData.length > 0 && teamData.map((member:any, idx:any) => {
                const img = JSON.parse(member.picture)
                return(
                  <div key={idx} className={`bg-[#121416] border border-[#1f1f1f] rounded-xl shadow-md ${classMap.hoverAnimate()}`}>
                    <img
                      src={img[0].url}
                      alt={member.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold text-[#19e68c]">{member.name}</h3>
                    <h6 className="text-sm text-gray-400">{member.role}</h6>

                    <div className="flex gap-3 justify-center mt-4">
                      {(JSON.parse(member.links) as any[]).map((s: any, i: any) => {
                        return (
                          <a
                            key={i}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#4db8ff] hover:text-[#19e68c] text-lg"
                          >
                            {getSocialIcon(s.value)}
                          </a>
                        );
                      })}
                    </div>

                    <button
                      className={`${classMap.button('','','','text-sm')}`}
                      onClick={() => setSelectedMember(member)}
                      style={{ cursor: "pointer" }}
                    >
                      View Profile
                    </button>
                  </div>
                )
                })}
            </div>
          </Fade>
        ) : (
          <Fade delay={100} triggerOnce>
            <div className="bg-[#111314] border border-[#1f1f1f] rounded-xl p-2 max-w-3xl mx-auto text-left relative">
              <button
                onClick={handleBack}
                className={`${classMap.button('','','','text-sm', 'left')}`}
                style={{ cursor: "pointer" }}
              >
                ← Back
              </button>
              <img
                src={JSON.parse(selectedMember.picture)[0]?.url}
                alt={selectedMember.name}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-6"
              />
              <h3 className="text-3xl font-bold text-center text-[#19e68c] mb-2">{selectedMember.name}</h3>
              <h6 className="text-center text-gray-400 mb-4">{selectedMember.role}</h6>
              <p className="text-gray-300 leading-relaxed text-center">{selectedMember.bio}</p>
              <div className="flex justify-center gap-4 mt-6">
                {(JSON.parse(selectedMember.links) as any[]).map((s,i) => {
                    return(
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-[#4db8ff] hover:text-[#19e68c]"
                      >
                        {getSocialIcon(s.value)}
                      </a>
                    )
                })}
              </div>
            </div>
          </Fade>
        )}
      </div>
    </section>
  );
};
