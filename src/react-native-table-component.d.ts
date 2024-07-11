declare module 'react-native-table-component' {
    import * as React from 'react';
    import { StyleProp, ViewStyle, TextStyle } from 'react-native';
  
    export interface TableProps {
      borderStyle?: StyleProp<ViewStyle>;
      style?: StyleProp<ViewStyle>;
      children: React.ReactNode;
    }
  
    export interface TableWrapperProps {
      style?: StyleProp<ViewStyle>;
      children: React.ReactNode;
    }
  
    export interface RowProps {
      data: any[];
      widthArr?: number[];
      height?: number;
      flexArr?: number[];
      style?: StyleProp<ViewStyle>;
      textStyle?: StyleProp<TextStyle>;
      numberOfLines?: number;
    }
  
    export interface RowsProps {
      data: any[][];
      widthArr?: number[];
      heightArr?: number[];
      flexArr?: number[];
      style?: StyleProp<ViewStyle>;
      textStyle?: StyleProp<TextStyle>;
      numberOfLines?: number;
    }
  
    export class Table extends React.Component<TableProps, any> {}
    export class TableWrapper extends React.Component<TableWrapperProps, any> {}
    export class Row extends React.Component<RowProps, any> {}
    export class Rows extends React.Component<RowsProps, any> {}
  }
  