"use client";

import React, { useState } from "react";
import { Card } from "./components/Card";
import { Button } from "./components/Button";
import { Question } from "./components/Question";
import { EndingNote } from "./components/EndingNote";

// Simple step identifiers for the conversational flow
const STEPS = {
  LANDING: "landing",
  WELL_BEING: "well-being",
  WELL_BEING_RESPONSE: "well-being-response",
  CONSENT: "consent",
  RELATIONSHIP: "relationship",
  COMEBACK: "comeback",
  ENDING: "ending",
};

export default function Home() {
  const [step, setStep] = useState(STEPS.LANDING);
  const [wellBeingChoice, setWellBeingChoice] = useState(null);
  const [endingContent, setEndingContent] = useState(null);

  // Derive the brief supportive message shown after the well-being choice
  const wellBeingMessage = (() => {
    if (wellBeingChoice === "okay") {
      return "I’m glad you’re finding some steadiness these days. You deserve that kind of calm.";
    }
    if (wellBeingChoice === "struggling") {
      return "I’m really glad you’re here, even if things have been heavy. You don’t have to explain any of it.";
    }
    if (wellBeingChoice === "no-answer") {
      return "It’s completely okay not to share more than you want. Your boundaries matter here.";
    }
    return "";
  })();

  const goToEnding = (content) => {
    setEndingContent(content);
    setStep(STEPS.ENDING);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card>
        {step === STEPS.LANDING && (
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Hey.
                <br />
                I made this with care.
                <br />
                You don’t have to stay.
              </p>
            </div>
            <div className="space-y-3">
              <Button onClick={() => setStep(STEPS.WELL_BEING)}>
                I’m okay to continue
              </Button>
              <Button
                variant="soft"
                onClick={() =>
                  goToEnding({
                    title: "Thank you for visiting, even briefly.",
                    body: "You never owe me your time or your answers. Stepping away is always allowed, and always respected.",
                  })
                }
              >
                Not right now
              </Button>
            </div>
          </div>
        )}

        {step === STEPS.WELL_BEING && (
          <Question title="Before anything else—are you okay these days?">
            <Button
              onClick={() => {
                setWellBeingChoice("okay");
                setStep(STEPS.WELL_BEING_RESPONSE);
              }}
            >
              I’m doing okay
            </Button>
            <Button
              variant="soft"
              onClick={() => {
                setWellBeingChoice("struggling");
                setStep(STEPS.WELL_BEING_RESPONSE);
              }}
            >
              I’ve been struggling
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setWellBeingChoice("no-answer");
                setStep(STEPS.WELL_BEING_RESPONSE);
              }}
            >
              I’d rather not say
            </Button>
          </Question>
        )}

        {step === STEPS.WELL_BEING_RESPONSE && (
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                {wellBeingMessage}
              </p>
            </div>
            <div>
              <Button onClick={() => setStep(STEPS.CONSENT)}>Continue</Button>
            </div>
          </div>
        )}

        {step === STEPS.CONSENT && (
          <Question
            title="There’s one more thing I want to ask,"
            body="but only if you’re comfortable."
          >
            <Button onClick={() => setStep(STEPS.RELATIONSHIP)}>
              You can ask
            </Button>
            <Button
              variant="soft"
              onClick={() =>
                goToEnding({
                  title: "Thank you for honoring your own limits.",
                  body: "Stopping here is completely okay. Your comfort matters more than any question I might have.",
                })
              }
            >
              I’d rather stop here
            </Button>
          </Question>
        )}

        {step === STEPS.RELATIONSHIP && (
          <Question title="Is your heart currently committed to someone else?">
            <Button
              onClick={() =>
                goToEnding({
                  title: "I respect the commitments you hold.",
                  body: "If your heart is already with someone, that deserves care and protection. There’s nothing more I need from you here.",
                })
              }
            >
              Yes
            </Button>
            <Button
              variant="soft"
              onClick={() => setStep(STEPS.COMEBACK)}
            >
              No
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                goToEnding({
                  title: "Your privacy is fully respected.",
                  body: "You never have to explain or clarify anything you’d rather keep to yourself. Not answering is always an option.",
                })
              }
            >
              I don’t want to answer
            </Button>
          </Question>
        )}

        {step === STEPS.COMEBACK && (
          <Question title="Would you be open to talking again—slowly, with no pressure?">
            <Button
              onClick={() =>
                goToEnding({
                  title: "I appreciate your openness.",
                  body: "Knowing you’re open to talking, gently and at your own pace, means a lot. There’s no timeline and no expectations attached to that.",
                })
              }
            >
              Yes, I’m open
            </Button>
            <Button
              variant="soft"
              onClick={() =>
                goToEnding({
                  title: "It’s okay not to be ready.",
                  body: "Needing more time is completely valid. You’re allowed to move slowly, or not at all, without needing to justify it.",
                })
              }
            >
              I’m not ready
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                goToEnding({
                  title: "Thank you for your honesty.",
                  body: "If you don’t think this is right for you, that choice is important and I respect it fully.",
                })
              }
            >
              I don’t think so
            </Button>
          </Question>
        )}

        {step === STEPS.ENDING && endingContent && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="font-sans text-2xl md:text-3xl font-medium leading-relaxed tracking-tight text-balance">
                {endingContent.title}
              </h1>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                {endingContent.body}
              </p>
            </div>
            <EndingNote />
          </div>
        )}
      </Card>
    </main>
  );
}

