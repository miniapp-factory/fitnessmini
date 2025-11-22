"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Exercise = {
  name: string;
  duration: number; // seconds
};

const exercises: Exercise[] = [
  { name: "Jumping Jacks", duration: 60 },
  { name: "Push‑Ups", duration: 60 },
  { name: "Squats", duration: 60 },
];

export function WorkoutRoutine() {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (timeLeft === 0) {
      if (current < exercises.length - 1) {
        setCurrent(current + 1);
        setTimeLeft(exercises[current + 1].duration);
      } else {
        setRunning(false);
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, timeLeft, current]);

  const start = () => {
    setRunning(true);
  };

  const reset = () => {
    setRunning(false);
    setCurrent(0);
    setTimeLeft(exercises[0].duration);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>3‑Minute Workout</CardTitle>
        <CardDescription>
          {exercises[current].name} – {timeLeft}s remaining
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="text-lg font-medium">
          {exercises.map((ex, idx) => (
            <div key={idx} className={`flex items-center gap-2 ${idx === current ? "text-primary" : ""}`}>
              <span>{idx + 1}.</span> {ex.name}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <Button onClick={start} disabled={running}>
            Start
          </Button>
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
