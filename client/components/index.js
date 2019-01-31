/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as UserGroups} from './UserGroups'
export {default as GroupCard} from './GroupCard'
export {default as AllEvents} from './AllEvents'
export {default as EventCard} from './EventCard'
export {default as CreateEvent} from './CreateEvent'
export {default as CreateGroup} from './CreateGroup'
export {default as SingleGroup} from './SingleGroup'

export {default as GlobalGroups} from './GlobalGroups'
