const { FreshheadsSassLoaderAdapter } = require('../../../build/index');

describe('FreshheadsSassLoaderAdapter', () => {
    describe('When applied', () => {
        describe('..without custom configuration', () => {
            let adapter;

            beforeEach(() => {
                adapter = new FreshheadsSassLoaderAdapter();
            });

            it('should add the correct loader', () => {
                const webpackConfig = {};

                adapter.apply(webpackConfig, { env: 'production' }, () => {});

                expect(webpackConfig).toHaveProperty('module.rules');

                const rules = webpackConfig.module.rules;

                expect(Array.isArray(rules)).toBe(true);
                expect(rules).toHaveLength(1);

                const onlyRule = rules[0];

                expect(onlyRule).toHaveProperty('use');

                const use = onlyRule.use;

                expect(Array.isArray(use)).toBe(true);
                expect(use).toHaveLength(2);

                expect(use[0]).toHaveProperty('loader', 'resolve-url-loader');
                expect(use[1]).toHaveProperty('loader', 'sass-loader');
            });

            it("should call the 'next' callback", done => {
                const callback = () => done();

                adapter.apply({}, { env: 'production' }, callback);
            });
        });

        describe('..with custom configuration', () => {
            let adapter;

            beforeEach(() => {
                adapter = new FreshheadsSassLoaderAdapter({
                    enabled: true,
                    sassLoaderOptions: {
                        sourceMap: false,
                    },
                });
            });

            it('should add the correct loader', () => {
                const webpackConfig = {};

                adapter.apply(webpackConfig, { env: 'production' }, () => {});

                expect(webpackConfig).toHaveProperty('module.rules');

                const rules = webpackConfig.module.rules;

                expect(Array.isArray(rules)).toBe(true);
                expect(rules).toHaveLength(1);

                const onlyRule = rules[0];

                expect(onlyRule).toHaveProperty('use');

                const use = onlyRule.use;

                expect(Array.isArray(use)).toBe(true);
                expect(use).toHaveLength(2);

                expect(use[0]).toHaveProperty('loader', 'resolve-url-loader');
                expect(use[1]).toHaveProperty('loader', 'sass-loader');
            });

            it("should call the 'next' callback", done => {
                const callback = () => done();

                adapter.apply({}, { env: 'production' }, callback);
            });
        });
    });
});
