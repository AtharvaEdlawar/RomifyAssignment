import {atom} from 'recoil'
import type { ITask } from './Types'


export const ItaskListAtom = atom<ITask[]>({
    key: 'ItaskListAtom',
    default: []
})


export const totalCountAtom = atom<number>({
    key: 'totalcount',
    default:0
})



