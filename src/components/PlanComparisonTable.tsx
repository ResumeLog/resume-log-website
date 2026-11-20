import { Check, X } from 'lucide-react'
import { Fragment } from 'react'
import { comparisonPlans, planComparison } from '../data/plan-comparison'

/**
 * What each plan includes: the Figma plan comparison as a real <table>
 * (crawlers and answer engines read tables well). The Pro column is tinted,
 * like the highlighted plan in the design.
 */
export default function PlanComparisonTable({ highlighted = 1 }: { highlighted?: number }) {
  const tint = (i: number) => (i === highlighted ? 'bg-panel' : '')
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] table-fixed border-collapse text-left text-sm">
        <caption className="sr-only">ResumeLog plans compared: Free, Pro and Enterprise</caption>
        <thead>
          <tr className="border-line border-b">
            {comparisonPlans.map((name, i) => (
              <th key={name} scope="col" className={`px-5 py-4 text-[15px] font-medium tracking-tight ${tint(i)}`}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planComparison.map((group) => (
            <Fragment key={group.name}>
              <tr className="border-line border-b">
                <th scope="rowgroup" colSpan={3} className="text-foreground px-5 pt-8 pb-3 text-[13px] font-medium">
                  {group.name}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.key} className="border-line border-b">
                  {row.cells.map((cell, i) => (
                    <td key={i} className={`px-5 py-3.5 align-top ${tint(i)}`}>
                      <span className="flex items-start gap-2">
                        {cell.included ? (
                          <Check size={15} strokeWidth={2.25} aria-hidden className="text-foreground mt-0.5 shrink-0" />
                        ) : (
                          <X size={14} strokeWidth={2} aria-hidden className="text-subtle mt-0.5 shrink-0" />
                        )}
                        <span className={cell.included ? 'text-foreground' : 'text-subtle'}>
                          <span className="sr-only">{cell.included ? 'Included: ' : 'Not included: '}</span>
                          {cell.label}
                        </span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
