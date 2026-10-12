import React from 'react'
import type { GoalView } from './goal.js'

export function GoalCard({ goal, available, onGoalCommand }: { goal: GoalView; available: boolean; onGoalCommand: (text: string) => void }) {
  const labels = { unknown: '状态未知', active: '进行中', none: '未设置', achieved: '已完成', failed: '未达成', ended: '已结束，原因未知' }
  return <section className="goal-card" aria-label="Goal 状态">
    <div className="goal-card-heading"><strong>Goal</strong><span>{labels[goal.status]}</span></div>
    {goal.condition && <p className="goal-condition">{goal.condition}</p>}
    {goal.iterations !== undefined && <p>已检查 {goal.iterations} 次</p>}
    {goal.lastReason && <p>最近停止检查：{goal.lastReason}</p>}
    {goal.status === 'achieved' && <p>{goal.durationMs !== undefined ? `用时 ${Math.round(goal.durationMs / 1000)} 秒` : ''}{goal.tokens !== undefined ? ` · 输出 ${goal.tokens} tokens` : ''}</p>}
    {available && <div className="goal-actions"><button type="button" onClick={() => onGoalCommand('/goal ')}>设置 / 查看</button>
      {goal.status === 'active' && <button type="button" onClick={() => onGoalCommand('/goal clear')}>清除</button>}</div>}
    {goal.status === 'unknown' && <small>当前执行器尚未公布 Goal 状态</small>}
  </section>
}
