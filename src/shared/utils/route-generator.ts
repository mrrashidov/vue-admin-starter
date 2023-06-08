// eslint-disable-next-line check-file/filename-naming-convention
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { isObject } from './index'

const routeNames = ['list', 'show', 'create', 'update'] as const
type RouteName = (typeof routeNames)[number]

interface Props {
  path: string
  parent: string
  can: Partial<Record<RouteName, RouteMeta['can']>>
  breadcrumb: SingleBreadcrumb[]
  has?: Partial<Record<RouteName, boolean>>
}

export const routeGenerator = ({
  path,
  can,
  breadcrumb,
  parent,
  has
}: Props): readonly RouteRecordRaw[] => {
  const gRouteNames = (has && isObject(has)
    ? Object.keys(has)
    : routeNames) as unknown as typeof routeNames

  return gRouteNames.map((route) => {
    const isList = route === 'list'
    const hasParam = (['show', 'update'] as RouteName[]).includes(route)
    return {
      path: isList ? path : `${path}/${route}${hasParam ? '/:id' : ''}`,
      name: `${parent}_${path}_${route}`,
      meta: {
        title: path,
        breadcrumb,
        can: can[route]
      },
      component: () => import(`@/modules/${parent}/views/${path}/${isList ? 'index' : route}.vue`)
    }
  })
}
