import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import { Snippet } from '../../src/components/Snippet';
import Spinner from '../../src/components/common/Spinner';

describe('Snippet', () => {
  const match = { params: { id: 1 } };
  const snippet = Map({
    id: 42,
    syntax: 'Text',
    tags: ['picobox', 'scope', 'contextvars'],
    created_at: '2018-05-05T09:58:26',
  });
  const snippetWithTitle = Map({
    id: 42,
    title: 'React',
    syntax: 'Text',
    tags: [],
    created_at: '2018-05-05T09:58:26',
  });

  it('should call componentDidMount once', () => {
    jest.spyOn(Snippet.prototype, 'componentDidMount');
    shallow(<Snippet dispatch={() => {}} match={match} />);

    expect(Snippet.prototype.componentDidMount.mock.calls.length).toBe(1);
  });

  it('should show Spinner if no snippet passed as props', () => {
    const wrapper = shallow(<Snippet />, { disableLifecycleMethods: true });

    expect(wrapper.type()).toEqual(Spinner);
  });

  it('should show snippet if snippet was passed as props', () => {
    const wrapper = shallow(<Snippet snippet={snippet} />, { disableLifecycleMethods: true });

    expect(wrapper.type()).not.toEqual(Spinner);
    expect(wrapper.find('.snippet-header').exists()).toEqual(true);
  });

  it('should show snippet tags if passed snippet has tags', () => {
    const wrapper = shallow(<Snippet snippet={snippet} />, { disableLifecycleMethods: true });
    const tags = wrapper.find('.snippet-data-tags');

    expect(tags.children()).toHaveLength(3);
    expect(tags.children().at(0).key()).toEqual(snippet.get('tags')[0]);
    expect(tags.children().at(1).key()).toEqual(snippet.get('tags')[1]);
    expect(tags.children().at(2).key()).toEqual(snippet.get('tags')[2]);
  });

  it('should not show snippet tags if passed snippet does not have them', () => {
    const wrapper = shallow(
      <Snippet snippet={snippetWithTitle} />,
      { disableLifecycleMethods: true },
    );
    const tags = wrapper.find('.snippet-data-tags');

    expect(tags.children().exists()).toEqual(false);
  });

  it('should show snippet custom title if passed snippet has it', () => {
    const wrapper = shallow(
      <Snippet snippet={snippetWithTitle} />,
      { disableLifecycleMethods: true },
    );
    const title = wrapper.find('.snippet-data-title');

    expect(title.text()).toEqual(snippetWithTitle.get('title'));
  });

  it('should show #id + Untitled as title if passed snippet does not have it', () => {
    const wrapper = shallow(<Snippet snippet={snippet} />, { disableLifecycleMethods: true });
    const title = wrapper.find('.snippet-data-title');

    expect(title.text()).toEqual(`#${snippet.get('id')}, Untitled`);
  });

  it('should trigger toggleEmbed after Embed button was clicked', () => {
    const spy = jest.spyOn(Snippet.prototype, 'toggleEmbed');
    const wrapper = shallow(<Snippet snippet={snippet} />, { disableLifecycleMethods: true });
    const embedButton = wrapper.find('.toggle-embed');

    embedButton.simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should trigger download after Download button was clicked', () => {
    const spy = jest.spyOn(Snippet.prototype, 'download');
    const wrapper = shallow(<Snippet snippet={snippet} />, { disableLifecycleMethods: true });
    const downloadButton = wrapper.find('.snippet-button-download');

    downloadButton.simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
