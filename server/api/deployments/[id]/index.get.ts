export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID),
  })

  schema.parse({ id })

  const deployment = await event.context.prisma.deployment.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      release: {
        select: {
          version: true,
          projectId: true,
        },
      },
    },
  }).catch((e) => { throw createPrismaError(e) })

  return deployment
})
