export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID),
  })

  schema.parse({ id })

  const deployment = await event.context.prisma.deployment.delete({
    where: {
      id,
    },
    select: {
      id: true,
    },
  }).catch((e) => { throw createPrismaError(e) })

  return deployment
})
