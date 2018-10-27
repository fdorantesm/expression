import acl from 'acl'
import mongoose from 'library/mongodb'

export default new acl(new acl.memoryBackend())
