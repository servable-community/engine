export default ({ protocols }) => {
  return protocols.map(p => ({
    "id": p.id,
    "version": p.version
  }))
}
