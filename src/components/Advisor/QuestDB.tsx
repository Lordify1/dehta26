import React, { useEffect, useMemo, useState } from "react";
import { FaEye, FaVoteYea, FaArrowLeft, FaRegQuestionCircle, FaCircleNotch } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { classMap, emptyData, InfoMessage, Loading } from "../Tools/Misc";
import { useUser } from "@/context/UserContext";
import { useMisc } from "@/context/MiscContext";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../../App";

const QuestDB = () => {
  const { user, getUser} = useUser();
  const { quests, getQuests, isLoading, userAns } = useMisc();
  const [processing, setProcessing] = useState(false)

  const [viewing, setViewing] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    getQuests();
  }, []);

  // Shuffle text into draggable letter objects
  const shuffle = (text) =>
    text
      .split("")
      .map((ltr, i) => ({
        id: `${ltr}-${i}-${Math.random()}`,
        value: ltr,
      }))
      .sort(() => Math.random() - 0.5);

  const pickOption = (opt) => {
    if (selectedOption === opt.id) return;
    setSelectedOption(opt.id);
    setLetters(shuffle(opt.option_text));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(letters);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setLetters(items);
  };

  const answeredQuestionIds = new Set(
    userAns.map(ans => ans.question_id)
  )

  const availableQuests = useMemo(() => {
    return quests.filter(tx => !answeredQuestionIds.has(tx.id))
  }, [quests, answeredQuestionIds])

  const submit = async () => {
    setProcessing(true)
    const chosen = viewing.options.find(o => o.id === selectedOption);
    const correctOption = viewing.options.find(o => o.id === selectedOption);
    if (!chosen) return;

    const answer = letters.map(l => l.value).join("").toLowerCase();
    const correct = chosen.option_text.toLowerCase();

    if (answer === correct) {
      if(correctOption.is_correct === 1){
      try {
        const res = await axios.post(`${apiUrl}/api/quest/submit`, {
          questionId: viewing.id,
          correct: correctOption.is_correct,
          optionId: selectedOption,
          reward: viewing.reward_per_correct
        });
        getQuests();
        getUser();
        setViewing(null);
        setProcessing(false);
        toast.success(res?.data?.message)
      } catch (err) {
        setProcessing(false)
        toast.error("Something went wrong");
      }
      }else{
        setProcessing(false)
        toast.error('Wrong Choice')
      }
    } else {
      setProcessing(false)
      toast.error("Wrong order.");
    }
  };

  return (
    <section className={`${classMap.dehtaCard()} min-h-[60vh]`}>
      <div className="overflow-y-scroll p-2">

        {/* Header */}
        <div className="flex items-center justify-between">
            <section className="flex flex-row">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <FaRegQuestionCircle /> Quests
            </h3>
            <InfoMessage
              message="Select a quest, choose an option, rearrange the letters in the correct order, and submit to earn the Lens reward."
            />
            </section>

          {viewing && (
            <FaArrowLeft
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setViewing(null);
                setSelectedOption(null);
                setLetters([]);
              }}
            />
          )}
        </div>

        {/* Quest List */}
        {!viewing && (
          <div className="flex gap-3 overflow-x-auto pb-3">
            {isLoading ? (
              <Loading />
            ) : !quests.length ? (
              emptyData("Available Quests will appear here")
            ) : !availableQuests.length ? (
              emptyData("You’ve completed all available quests 🎉. Take a Break")
            ) : (
              availableQuests.map(tx => (
                <div
                  key={tx.id}
                  onClick={() => setViewing(tx)}
                  className={`min-w-60 shrink-0 rounded flex flex-col justify-between ${classMap.section} cursor-pointer p-3`}
                >
                  <section className="flex flex-col">
                    <span>{tx.body}</span>
                    <small className="text-(--owner)">
                      Reward: {tx.reward_per_correct} Lens
                    </small>
                  </section>

                  <FaEye
                    className="cursor-pointer"
                    onClick={() => setViewing(tx)}
                  />
                </div>
              ))
            )}
          </div>
        )}

        {/* Quest View */}
        {viewing && (
          <div className="mt-3 space-y-3">
            <p className="text-xl font-bold">{viewing.body}</p>

            <DragDropContext onDragEnd={onDragEnd}>
              <div className="space-y-3">
                {viewing.options.map((o, index) => (
                  <div
                    key={o.id}
                    className={`${classMap.section} p-3 rounded cursor-pointer ${
                      selectedOption === o.id ? "border-green-600" : ""
                    }`}
                    onClick={() => pickOption(o)}
                  >
                    <p className="font-semibold">Option {index + 1}</p>

                    {selectedOption === o.id ? (
                      <Droppable droppableId="letters" direction="horizontal">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex gap-2 mt-2 overflow-x-auto"
                          >
                            {letters.map((item, i) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={i}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`
                                      px-2 py-2 border rounded font-bold select-none
                                      bg-neutral-900
                                      transition
                                      ${snapshot.isDragging ? "scale-105 shadow-lg z-50" : ""}
                                    `}
                                    style={provided.draggableProps.style}
                                  >
                                    {item.value}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ) : (
                      <p className="italic opacity-60">
                        Click to attempt this one
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </DragDropContext>

            {selectedOption && (
              <button
                className={`${classMap.button()} w-full`}
                onClick={submit}
                disabled={processing}
              >
                {processing ? <div className="flex items-center w-full justify-center"><FaCircleNotch className="text-1xl h-6 text-center opacity-60 text-(--primary) animate-spin transitions duration-500 "/></div> : 'Check'}
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default QuestDB;