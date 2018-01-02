import * as actions from '../src/actions';


describe('actions', () => {
  it('should create an action to set recent snippets', () => {
    const snippets = [
      {
        id: 1,
        content: 'test',
        syntax: 'JavaScript',
      },
      {
        id: 2,
        content: 'batman',
        syntax: 'Python',
      },
    ];
    const expectedAction = {
      type: 'SET_RECENT_SNIPPETS',
      snippets,
    };

    expect(actions.setRecentSnippets(snippets)).toEqual(expectedAction);
  });
});
