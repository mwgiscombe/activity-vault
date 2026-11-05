import {z} from 'zod'

export const ActivitySchema = z.object({
    title: z.string(),
    summary: z.string(),
    ageRange: z.string(),
    durationMinutes: z.number(),
    learningGoals: z.array(z.string()),
    materials: z.array(z.string()),
    prepSteps: z.array(z.string()),
    instructions: z.array(
        z.object({step: z.number(), title: z.string(), details: z.string() })
    ),
    facilitatorTips: z.array(z.string()),
    discussionQuestions: z.array(z.string()),
    safetyNotes: z.array(z.string()),
    printables: z.array(
        z.object({
            name: z.string(),
            description: z.string(),
            content: z.string()
        })
    )

})