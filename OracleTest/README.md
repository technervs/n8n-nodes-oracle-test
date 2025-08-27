# Oracle Test Node for n8n

## Purpose

This is a **minimal Oracle Test node** created specifically to demonstrate and reproduce the **credential test bug** in n8n for custom nodes (Issue #8188).

## Bug Description

**Problem**: The credential test function (`oracleTestConnectionTest`) is not being triggered when clicking "Test" button in the n8n credentials modal for custom nodes.

**Expected Behavior**: When clicking "Test" in the credentials modal, the `oracleTestConnectionTest` function should be called and return success/error status.

**Actual Behavior**: The test function is never called, and no feedback is provided to the user.

## Node Structure

### Files Created:
- `credentials/OracleTest.credentials.ts` - Credential definition with `testedBy` property
- `nodes/OracleTest/OracleTest.node.ts` - Simple node with credential test method
- `nodes/OracleTest/oracle.svg` - Basic icon
- `nodes/OracleTest/package.json` - Package configuration

### Key Configuration:

**In credentials file:**
```typescript
testedBy = 'oracleTestConnectionTest';
```

**In node file:**
```typescript
credentials: [
    {
        name: 'oracleTest',
        required: true,
        testedBy: 'oracleTestConnectionTest',
    },
],

methods = {
    credentialTest: {
        async oracleTestConnectionTest(/* ... */) {
            // Test implementation
        },
    },
};
```

## How to Test

1. Install this node package in n8n
2. Go to Credentials → Create New → Oracle Test
3. Fill in any values for host, user, password
4. Click "Test" button
5. **Expected**: Success message should appear
6. **Actual**: Nothing happens (bug)

## Technical Details

- **n8n Version**: Tested on 1.x
- **Node API Version**: 1
- **Issue Reference**: n8n-io/n8n#8188
- **Related PR**: n8n-io/n8n#16657 (fixed for Jira node, but not for custom nodes)

## Workaround

Currently, there's no reliable workaround for custom nodes. The issue appears to be in n8n's core `load-nodes-and-credentials.ts` file where `supportedNodes` is not properly populated for custom nodes.

## Contact

This node was created solely for bug reproduction purposes. Please refer to the original n8n GitHub issue for technical discussions.
