import { useEffect, useState } from 'react';
import {
  textLowerPattern,
  textNumberPattern,
  textSymbolPattern,
  textUpperPattern,
} from '../utils/constants';

const passStrengthStyles = [
  'strength-transparent',
  'strength-red',
  'strength-orange',
  'strength-green',
];

const testRegex = (template: RegExp, password: string): number =>
  template.test(password) ? 1 : 0;

const getPasswordStrength = (password: string) => {
  const passwordStrength =
    testRegex(textSymbolPattern.regex, password) +
    testRegex(textNumberPattern.regex, password) +
    testRegex(textLowerPattern.regex, password) +
    testRegex(textUpperPattern.regex, password);
  return passStrengthStyles[passwordStrength];
};

const PasswordStrength = (props: { password: string }) => {
  const { password } = props;
  const [strength, setStrength] = useState(passStrengthStyles[0]);

  useEffect(() => {
    const currentStrength = getPasswordStrength(password);
    setStrength(`strength ${currentStrength}`);
  }, [password]);

  return <button className={strength} />;
};

export default PasswordStrength;
