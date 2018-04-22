import * as chai from 'chai';

import State from './State';

const {assert} = chai;

const createMockState = () => ({
    groups: [
        {options: [{}, {}]},
        {options: [{
            value: 'foo'
        }, {}]}
    ]
});

describe('State', function() {
    describe('get totalGroups()', () => {
        it('returns the total number of groups', () => {
            const state = new State(createMockState());

            assert.equal(state.totalGroups, 2);
        });
    });

    describe('get totalOptions()', () => {
        it('returns the total number of options', () => {
            const state = new State(createMockState());

            assert.equal(state.totalOptions, 4);
        });
    });

    describe('get value()', () => {
        it('returns an empty string if no selected index', () => {
            const state = new State(createMockState());

            assert.equal(state.value, '');
        });

        it('returns a value based on the selected index for multiple groups', () => {
            const mockState = Object.assign(createMockState(), {
                selectedIndex: 2
            });

            const state = new State(mockState);

            assert.equal(state.value, 'foo');
        });

        it('returns a value based on the selected index for a single group', () => {
            const mockState = Object.assign(createMockState(), {
                selectedIndex: 0
            });

            mockState.groups.splice(0, 1);

            const state = new State(mockState);

            assert.equal(state.value, 'foo');
        });
    });

    describe('get isGrouped()', () => {
        it('returns `false` if no groups have a label', () => {
            const state = new State(createMockState());

            assert.isFalse(state.isGrouped);
        });

        it('returns `true` if at least one group has a label', () => {
            const mockState = createMockState();

            (mockState.groups[0] as any).label = 'foo';

            const state = new State(mockState);

            assert.isTrue(state.isGrouped);
        });
    });
});