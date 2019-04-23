import React from 'react';
import { Navigation } from 'react-native-navigation';

import { NavigationContext } from './context';
import { Mount, Update } from 'react-lifecycle-components';
import { Platform } from 'react-primitives';

interface NavigationOptionsProps {
  options: any;
}

function deepEquals<T>(a: T, b: T): boolean {
  if (typeof a !== 'object') {
    return a === b
  }
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) {
    return false
  }

  return aKeys.every(key => deepEquals(a[key as keyof T], b[key as keyof T]))
}

type WasUpdatedFunction<T> = (prev: T, current: T) => void;

interface UpdateDeepProps<T> {
  was: WasUpdatedFunction<T>
  watched: T
}

class UpdateDeepEquals<T> extends React.Component<UpdateDeepProps<T>> {
  componentDidUpdate(prevProps: UpdateDeepProps<T>) {
    const { was, watched } = this.props
    if (!deepEquals(prevProps.watched, watched)) {
      was(prevProps.watched, watched)
    }
  }

  render() {
    return this.props.children || null
  }
}

export const NavigationOptions: React.SFC<NavigationOptionsProps> = ({
  children = null,
  options,
}) => (
    Platform.OS === "android" ? <>{children}</> : (
      <NavigationContext.Consumer>
        {({ componentId = '' }) => {
          return (
            <Mount on={() => Navigation.mergeOptions(componentId, options)}>
              {Platform.OS === 'ios' && (
                <Update
                  was={() => Navigation.mergeOptions(componentId, options)}
                  watched={options}
                >
                  {children}
                </Update>
              )}
              {Platform.OS === 'android' && (
                <UpdateDeepEquals
                  was={() => Navigation.mergeOptions(componentId, options)}
                  watched={options}
                >
                  {children}
                </UpdateDeepEquals>
              )}
            </Mount>
          );
        }}
      </NavigationContext.Consumer>
    )
  );
