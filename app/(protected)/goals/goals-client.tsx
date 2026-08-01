"use client";

import { useState } from "react";
import { Plus, Target, CheckCircle2, X, Calendar } from "lucide-react";
import { calcProgress, formatDate, cn } from "@/lib/utils";
import { differenceInDays } from "date-fns";
import { GoalForm } from "./goal-form";

interface Goal {
  id: string;
  title: string;
  category: string;
  color: string;
  targetAmount: number;
  completedAmount: number;
  unit: string;
  startDate: Date;
  endDate: Date;
  status: string;
  dailyTarget: number;
}

interface GoalsClientProps {
  goals: Goal[];
}

export function GoalsClient({ goals }: GoalsClientProps) {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const activeGoals = goals.filter((g) => g.status === "ACTIVE");
  const completedGoals = goals.filter((g) => g.status === "COMPLETED");

  const today = new Date();

  const handleSelectGoal = (id: string) => {
    setIsCreating(false);
    setSelectedGoalId(id);
  };

  const handleCreateNew = () => {
    setSelectedGoalId(null);
    setIsCreating(true);
  };

  const closeSidebar = () => {
    setIsCreating(false);
    setSelectedGoalId(null);
  };

  const selectedGoal = goals.find((g) => g.id === selectedGoalId);
  const isSidebarOpen = isCreating || selectedGoalId !== null;

  return (
    <div className="animate-fade-in space-y-6 pb-10 font-sans">
      {/* Header - matching Settings page style */}
      <div className="mb-8 flex items-center justify-between border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Goals
          </h1>
          <p className="mt-1 text-sm text-[#8b949e]">
            {activeGoals.length} active · {completedGoals.length} completed
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-[rgba(255,255,255,0.1)] bg-[#238636] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#2ea043]"
        >
          <Plus className="h-4 w-4" />
          New Goal
        </button>
      </div>

      <div className="w-full">
        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-[#30363d] bg-[#0d1117] py-24">
            <Target className="mb-4 h-12 w-12 text-[#8b949e]" />
            <h2 className="text-lg font-semibold text-white">No goals yet</h2>
            <p className="mt-1 text-sm text-[#8b949e]">
              Create your first goal to start tracking your progress.
            </p>
            <button
              onClick={handleCreateNew}
              className="mt-6 flex items-center gap-2 rounded-md border border-[rgba(255,255,255,0.1)] bg-[#238636] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2ea043]"
            >
              <Plus className="h-4 w-4" />
              Create first goal
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Active Goals */}
            {activeGoals.length > 0 && (
              <section>
                <h2 className="mb-4 text-sm font-semibold text-white">
                  Active ({activeGoals.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {activeGoals.map((goal) => {
                    const pct = calcProgress(
                      goal.completedAmount,
                      goal.targetAmount,
                    );
                    const daysLeft = Math.max(
                      0,
                      differenceInDays(new Date(goal.endDate), today),
                    );

                    return (
                      <div
                        key={goal.id}
                        onClick={() => handleSelectGoal(goal.id)}
                        className="group flex cursor-pointer flex-col justify-between rounded-md border border-[#30363d] bg-[#161b22] p-5 transition-all hover:border-[#8b949e] hover:bg-[#1f242c]"
                      >
                        {/* Top Section */}
                        <div>
                          <h3 className="mb-2 line-clamp-1 text-xl leading-none font-bold text-white">
                            {goal.title}
                          </h3>
                          <p className="mb-6 text-xs text-[#8b949e]">
                            {formatDate(goal.startDate)} —{" "}
                            {formatDate(goal.endDate)} &middot; {daysLeft} days
                            left
                          </p>
                        </div>

                        {/* Progress Section */}
                        <div>
                          <div className="mb-3 flex items-end justify-between">
                            <div>
                              <div className="mb-1.5 text-2xl leading-none font-bold text-white">
                                {pct}%
                              </div>
                              <div className="text-xs font-medium text-[#8b949e]">
                                {goal.completedAmount} / {goal.targetAmount}{" "}
                                {goal.unit}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="mb-1 text-sm font-bold text-white">
                                {goal.dailyTarget}{" "}
                                <span className="text-xs font-normal text-[#8b949e]">
                                  / day
                                </span>
                              </div>
                              <div className="text-xs font-medium text-[#8b949e]">
                                pace required
                              </div>
                            </div>
                          </div>

                          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#0d1117]">
                            <div
                              className="h-full rounded-full transition-all duration-500 ease-out"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: goal.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Completed Goals */}
            {completedGoals.length > 0 && (
              <section>
                <h2 className="mb-4 text-sm font-semibold text-white">
                  Completed ({completedGoals.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {completedGoals.map((goal) => (
                    <div
                      key={goal.id}
                      onClick={() => handleSelectGoal(goal.id)}
                      className="group flex cursor-pointer items-start gap-3 rounded-md border border-[#30363d] bg-[#161b22] p-5 opacity-70 transition-all hover:border-[#8b949e] hover:bg-[#1f242c] hover:opacity-100"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#39d353]" />
                      <div>
                        <div className="mb-1 text-sm font-semibold text-[#8b949e] line-through transition-colors group-hover:text-white">
                          {goal.title}
                        </div>
                        <div className="text-xs text-[#8b949e]">
                          {goal.targetAmount} {goal.unit} · Completed{" "}
                          {formatDate(goal.endDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Slide-over Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Slide-over Drawer Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-110 flex w-full max-w-100 transform flex-col overflow-y-auto border-l border-[#30363d] bg-[#0d1117] shadow-2xl transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-6">
          {isCreating ? (
            <GoalForm onCancel={closeSidebar} />
          ) : selectedGoal ? (
            <div className="flex flex-col gap-10">
              <div className="flex items-start justify-between">
                <div className="pr-4">
                  <h2 className="mb-2 text-2xl leading-tight font-bold tracking-tight text-white">
                    {selectedGoal.title}
                  </h2>
                  <span className="text-sm font-medium tracking-wide text-[#8b949e] uppercase">
                    {selectedGoal.category}
                  </span>
                </div>
                <button
                  onClick={closeSidebar}
                  className="-mt-1 shrink-0 rounded-md p-1.5 text-[#8b949e] transition-colors hover:bg-[#161b22] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="mb-5 text-sm font-semibold text-white">
                    Progress
                  </h3>
                  <div className="flex flex-col">
                    <div className="mb-4 flex items-end justify-between">
                      <span className="text-4xl leading-none font-extrabold text-white">
                        {calcProgress(
                          selectedGoal.completedAmount,
                          selectedGoal.targetAmount,
                        )}
                        %
                      </span>
                      <span className="mb-1 text-sm font-medium text-[#8b949e]">
                        {selectedGoal.completedAmount} /{" "}
                        {selectedGoal.targetAmount} {selectedGoal.unit}
                      </span>
                    </div>

                    <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-[#21262d]">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${calcProgress(selectedGoal.completedAmount, selectedGoal.targetAmount)}%`,
                          backgroundColor: selectedGoal.color,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between border-y border-[#30363d] py-3 text-sm text-[#8b949e]">
                      <span>Daily Target</span>
                      <div>
                        <span className="font-bold text-white">
                          {selectedGoal.dailyTarget} {selectedGoal.unit}
                        </span>{" "}
                        pace
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-5 text-sm font-semibold text-white">
                    Timeline
                  </h3>
                  <div className="space-y-0">
                    <div className="flex items-center justify-between border-b border-[#30363d] py-3 text-sm">
                      <span className="flex items-center gap-2 text-[#8b949e]">
                        <Calendar className="h-4 w-4" /> Start Date
                      </span>
                      <span className="font-medium text-white">
                        {formatDate(selectedGoal.startDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 text-sm">
                      <span className="flex items-center gap-2 text-[#8b949e]">
                        <Calendar className="h-4 w-4" /> End Date
                      </span>
                      <span className="font-medium text-white">
                        {formatDate(selectedGoal.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
