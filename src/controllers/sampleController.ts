import {
  BaseControllerCreate,
  BaseControllerDelete,
  BaseControllerRead,
  BaseControllerUpdate,
  Mixin,
} from '@backapirest/any';
export default class SampleController extends Mixin(
  BaseControllerCreate,
  BaseControllerRead,
  BaseControllerUpdate,
  BaseControllerDelete
) {}
