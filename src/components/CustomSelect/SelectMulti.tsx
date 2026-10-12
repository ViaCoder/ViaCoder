import React from 'react';
import type {PastedContent} from '../../utils/config.js';
import type {ImagePasteMetadata287} from './officialImageConsumer287/native.js';
import type {OptionWithDescription} from './select.js';
export type SelectMultiProps<T> = {
  readonly isDisabled?: boolean;
  readonly visibleOptionCount?: number;
  readonly options: OptionWithDescription<T>[];
  readonly defaultValue?: T[];
  readonly onCancel: () => void;
  readonly onChange?: (values: T[]) => void | boolean;
  readonly onFocus?: (value: T) => void;
  /** Legacy declaration only; the 287 public Multi does not read focusValue. */
  readonly focusValue?: T;
  /**
   * Text for the submit button. When provided, a submit button is shown and
   * Enter toggles selection (submit only fires when the button is focused).
   * When omitted, Enter submits directly and Space toggles selection.
   */
  readonly submitButtonText?: string;
  /**
   * Callback when user submits. Receives the currently selected values.
   */
  readonly onSubmit?: (values: T[]) => void;
  /**
   * When true, hides the numeric indexes next to each option.
   */
  readonly hideIndexes?: boolean;
  /**
   * Callback when user presses down from the last item (submit button).
   * If provided, navigation will not wrap to the first item.
   */
  readonly onDownFromLastItem?: () => void;
  /**
   * Callback when user presses up from the first item.
   * If provided, navigation will not wrap to the last item.
   */
  readonly onUpFromFirstItem?: () => void;
  /**
   * Focus the last option initially instead of the first.
   */
  readonly initialFocusLast?: boolean;
  /**
   * Callback to open external editor for editing input option values.
   * When provided, ctrl+g will trigger this callback in input options
   * with the current value and a setter function to update the internal state.
   */
  readonly onOpenEditor?: (currentValue: string, setValue: (value: string) => void) => void;
  readonly canPasteImage?: () => boolean;
  readonly onImagePaste?: (base64Image: string, metadata?: ImagePasteMetadata287) => void;
  readonly refuseSubmitFocus?: () => boolean;
  readonly refuseInput?: () => boolean;
  readonly pastedContents?: Record<number, PastedContent>;
  readonly onRemoveImage?: (id: number) => void;
};
/** Complete public I$ / AX / pointer / keyboard closure in the existing
 * canonical namespace. All applicable production imports use this facade;
 * no second selection state or option mapper is created here. */
export function SelectMulti<T>(props:SelectMultiProps<T>):React.ReactNode {
  const namespace=(import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-f4z2e24z.js');
  const OriginalMulti=namespace.I$ as React.ComponentType<SelectMultiProps<T>>;
  return <OriginalMulti {...props}/>;
}
