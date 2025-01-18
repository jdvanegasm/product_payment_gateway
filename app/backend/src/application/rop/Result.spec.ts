import { Result, success, failure, isFailure } from './Result';

describe('Result', () => {
  it('should create a success result', () => {
    const result = success('Success message');
    expect(result.isSuccess).toBe(true);
    if (!isFailure(result)) {
      expect(result.value).toBe('Success message');
    }
  });

  it('should create a failure result', () => {
    const result = failure('Error message');
    expect(result.isSuccess).toBe(false);
    if (isFailure(result)) {
      expect(result.error).toBe('Error message');
    }
  });
});